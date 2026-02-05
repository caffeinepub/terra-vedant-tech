# Deployment Guide

## Production Deployment

This document provides guidance for deploying Terra Vedant Tech to production on the Internet Computer.

### Quick Retry Checklist

Before retrying a failed deployment, verify:

- [ ] All TypeScript files compile without errors (`pnpm typescript-check`)
- [ ] Frontend build completes successfully (`pnpm build:skip-bindings`)
- [ ] All import paths use the `@/` alias correctly
- [ ] Asset files exist in `frontend/public/assets/generated/`
- [ ] Vite and TypeScript configurations are present and valid

### Common Build Blockers

1. **Missing path alias configuration**
   - Ensure `vite.config.ts` defines the `@/` alias
   - Ensure `tsconfig.json` includes path mappings for `@/*`

2. **Missing Vite type declarations**
   - Ensure `frontend/src/vite-env.d.ts` exists with Vite client types

3. **Asset path issues**
   - Static assets should be in `frontend/public/assets/`
   - Reference them with absolute paths: `/assets/filename`

4. **TypeScript errors**
   - Run `pnpm typescript-check` to catch type errors before deployment
   - Ensure all dependencies are installed

### Deployment Command

