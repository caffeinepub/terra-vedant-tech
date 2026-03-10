import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetUserPreferences,
  useGetVisitCount,
  useIncrementVisitCount,
  useUpdateUserPreferences,
} from "@/hooks/useQueries";
import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  Leaf,
  Loader2,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const CONTACT_TOPICS = [
  "General",
  "Precision Agriculture",
  "Drone Services",
  "Soil Analysis",
  "Crop Monitoring",
  "Smart Irrigation",
  "Partnership",
];

export function DashboardSection() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const {
    data: preferences,
    isLoading: prefsLoading,
    isError: prefsError,
  } = useGetUserPreferences();
  const { data: visitCount, isLoading: visitLoading } = useGetVisitCount();
  const incrementVisit = useIncrementVisitCount();
  const updatePreferences = useUpdateUserPreferences();

  const [displayName, setDisplayName] = useState("");
  const [preferredTopic, setPreferredTopic] = useState("General");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync form state when preferences load
  useEffect(() => {
    if (preferences) {
      setDisplayName(
        preferences.displayName === "Anonymous" ? "" : preferences.displayName,
      );
      setPreferredTopic(preferences.preferredContactTopic || "General");
    }
  }, [preferences]);

  // Increment visit count once on mount for authenticated users
  // incrementVisit.mutate is referentially stable (React Query guarantee)
  const { mutate: incrementVisitMutate } = incrementVisit;
  useEffect(() => {
    if (isAuthenticated) {
      incrementVisitMutate();
    }
  }, [isAuthenticated, incrementVisitMutate]);

  if (!isAuthenticated) return null;

  const handleSavePreferences = async () => {
    setSaveSuccess(false);
    await updatePreferences.mutateAsync({
      displayName: displayName.trim() || "Anonymous",
      preferredContactTopic: preferredTopic,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const userName =
    preferences?.displayName && preferences.displayName !== "Anonymous"
      ? preferences.displayName
      : "there";

  const visitCountDisplay =
    visitCount !== undefined ? Number(visitCount) : null;

  return (
    <section
      id="dashboard"
      aria-label="User dashboard"
      className="py-16 md:py-20 bg-muted/30"
    >
      <div className="container px-4 mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Leaf className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              {prefsLoading ? (
                <Skeleton className="h-8 w-56 inline-block" />
              ) : (
                <>
                  Welcome back, <span className="text-primary">{userName}</span>
                  !
                </>
              )}
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Your personalized Terra Vedant Tech dashboard
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visit Count Card */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BarChart2
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="text-base font-semibold">
                  Activity
                </CardTitle>
              </div>
              <CardDescription>
                Your engagement with our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {visitLoading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                <div className="flex items-end gap-2">
                  <span className="font-display font-bold text-4xl text-foreground">
                    {visitCountDisplay ?? 0}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">
                    {visitCountDisplay === 1 ? "visit" : "visits"}
                  </span>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Total sessions recorded on-chain
              </p>
            </CardContent>
          </Card>

          {/* Preferences Summary Card */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" aria-hidden="true" />
                <CardTitle className="text-base font-semibold">
                  Your Profile
                </CardTitle>
              </div>
              <CardDescription>
                Saved preferences for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {prefsLoading ? (
                <>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-40" />
                </>
              ) : prefsError ? (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Could not load preferences</span>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Display Name
                    </p>
                    <p className="font-medium text-foreground text-sm">
                      {preferences?.displayName &&
                      preferences.displayName !== "Anonymous" ? (
                        preferences.displayName
                      ) : (
                        <span className="text-muted-foreground italic">
                          Not set
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Preferred Topic
                    </p>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {preferences?.preferredContactTopic || "General"}
                    </Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Update Preferences Card */}
          <Card className="border border-border/60 shadow-sm md:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" aria-hidden="true" />
                <CardTitle className="text-base font-semibold">
                  Preferences
                </CardTitle>
              </div>
              <CardDescription>Update your saved settings</CardDescription>
            </CardHeader>
            <CardContent>
              {prefsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSavePreferences();
                  }}
                  className="space-y-3"
                  aria-label="Update preferences form"
                >
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="displayName"
                      className="text-xs font-medium"
                    >
                      Display Name
                    </Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      className="h-9 text-sm"
                      maxLength={60}
                      disabled={updatePreferences.isPending}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contactTopic"
                      className="text-xs font-medium"
                    >
                      Preferred Contact Topic
                    </Label>
                    <Select
                      value={preferredTopic}
                      onValueChange={setPreferredTopic}
                      disabled={updatePreferences.isPending}
                    >
                      <SelectTrigger id="contactTopic" className="h-9 text-sm">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTACT_TOPICS.map((topic) => (
                          <SelectItem
                            key={topic}
                            value={topic}
                            className="text-sm"
                          >
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {updatePreferences.isError && (
                    <div
                      className="flex items-center gap-2 text-destructive text-xs"
                      role="alert"
                    >
                      <AlertCircle
                        className="h-3.5 w-3.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>Failed to save. Please try again.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={updatePreferences.isPending}
                  >
                    {updatePreferences.isPending ? (
                      <>
                        <Loader2
                          className="mr-2 h-3.5 w-3.5 animate-spin"
                          aria-hidden="true"
                        />
                        Saving…
                      </>
                    ) : saveSuccess ? (
                      <>
                        <CheckCircle
                          className="mr-2 h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        Saved!
                      </>
                    ) : (
                      "Save Preferences"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
