# Production Deployment Guide

This document provides a comprehensive guide for deploying Terra Vedant Tech to the Internet Computer mainnet.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start: Automated Deployment](#quick-start-automated-deployment)
3. [Manual Deployment Steps](#manual-deployment-steps)
4. [Retrying After a Failed Deploy](#retrying-after-a-failed-deploy)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Troubleshooting](#troubleshooting)
7. [Rollback Procedures](#rollback-procedures)
8. [Maintenance Best Practices](#maintenance-best-practices)

---

## Prerequisites

Before deploying, ensure you have the following installed and configured:

### Required Software

- **Node.js** (v18 or higher) and **pnpm** package manager
- **dfx** (Internet Computer SDK) - Install via:
  ```bash
  sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
  ```
- **Git** for version control

### Verify Installations

Run these commands to verify your environment:

