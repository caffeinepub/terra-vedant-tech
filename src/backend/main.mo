import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    displayName : Text;
    preferredContactTopic : Text;
  };

  type UserData = {
    visitCount : Nat;
    lastLogin : Time.Time;
    preferences : UserProfile;
  };

  let userData = Map.empty<Principal, UserData>();

  // Returns personalized dashboard info; guests get a generic message, no auth trap needed
  public query ({ caller }) func getPersonalizedDashboard() : async Text {
    switch (AccessControl.getUserRole(accessControlState, caller)) {
      case (#admin or #user) {
        let entry = userData.get(caller);
        switch (entry) {
          case (null) {
            "Welcome new user " # caller.toText() # "!";
          };
          case (?entry) {
            "Welcome back, " # caller.toText() # ". This is your personalized dashboard. Last login: " # Int.toText(entry.lastLogin);
          };
        };
      };
      case (#guest) {
        "Please login to see your personalized dashboard.";
      };
    };
  };

  // Only authenticated users (not guests) may increment their visit count
  public shared ({ caller }) func incrementVisitCount() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can increment visit count");
    };
    let currentTime = Time.now();
    let updatedData = switch (userData.get(caller)) {
      case (null) {
        {
          visitCount = 1;
          lastLogin = currentTime;
          preferences = {
            displayName = "Anonymous";
            preferredContactTopic = "General";
          };
        };
      };
      case (?data) {
        {
          visitCount = data.visitCount + 1;
          lastLogin = currentTime;
          preferences = data.preferences;
        };
      };
    };
    userData.add(caller, updatedData);
  };

  // Only authenticated users may read their own visit count
  public query ({ caller }) func getVisitCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view visit count");
    };
    switch (userData.get(caller)) {
      case (null) { 0 };
      case (?data) { data.visitCount };
    };
  };

  // Only authenticated users may read their own preferences
  public query ({ caller }) func getUserPreferences() : async UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view preferences");
    };
    switch (userData.get(caller)) {
      case (null) {
        {
          displayName = "Anonymous";
          preferredContactTopic = "General";
        };
      };
      case (?data) { data.preferences };
    };
  };

  // Only authenticated users may update their own preferences
  public shared ({ caller }) func updateUserPreferences(displayName : Text, preferredContactTopic : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update preferences");
    };
    let currentTime = Time.now();
    let newPreferences = {
      displayName;
      preferredContactTopic;
    };
    let updatedData = switch (userData.get(caller)) {
      case (null) {
        {
          visitCount = 1;
          lastLogin = currentTime;
          preferences = newPreferences;
        };
      };
      case (?data) {
        {
          visitCount = data.visitCount;
          lastLogin = currentTime;
          preferences = newPreferences;
        };
      };
    };
    userData.add(caller, updatedData);
  };

  // Required by frontend: get the caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their profile");
    };
    switch (userData.get(caller)) {
      case (null) { null };
      case (?data) { ?data.preferences };
    };
  };

  // Required by frontend: save the caller's own profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save their profile");
    };
    let currentTime = Time.now();
    let updatedData = switch (userData.get(caller)) {
      case (null) {
        {
          visitCount = 1;
          lastLogin = currentTime;
          preferences = profile;
        };
      };
      case (?data) {
        {
          visitCount = data.visitCount;
          lastLogin = data.lastLogin;
          preferences = profile;
        };
      };
    };
    userData.add(caller, updatedData);
  };

  // Required by frontend: get another user's profile; caller can view own profile or admin can view any
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (userData.get(user)) {
      case (null) { null };
      case (?data) { ?data.preferences };
    };
  };
};
