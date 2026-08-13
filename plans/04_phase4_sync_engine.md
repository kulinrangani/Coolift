# Phase 4 Plan — Offline-First Synchronization Engine

*Focus: Background sync queue, network status detection, idempotent server sync handler, and conflict-free data replication.*

---

## 🎯 Phase Goal
Bridge client-side Dexie IndexedDB storage with the Express/MongoDB backend. Enable background data synchronization whenever internet connection is available without blocking the user interface or producing duplicate workout sessions.

---

## 📋 Task Breakdown

### 1. Client Sync Queue Architecture (`SyncQueue`)
Every mutation (creating a workout session, completing a set, logging body weight) writes an item to the Dexie `syncQueue` table:
```typescript
interface SyncQueueItem {
  localId: string;        // Client UUID
  entityType: 'SESSION' | 'BODY_WEIGHT';
  entityId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: any;
  createdAt: number;
  retryCount: number;
  synced: boolean;
}
```

### 2. Synchronization Engine Service (`syncEngine.ts`)
* **Network Status Listeners:** React to `online` and `offline` browser events.
* **Batch Processor:**
  * When online, read all unsynced items (`synced === false`) ordered by `createdAt`.
  * Send payload batch to `POST /api/sync`.
  * On HTTP 200 success response, mark local items as `synced: true` or purge synced queue items.
  * On failure (network drop/server error), increment `retryCount` with exponential backoff retry.

### 3. Server Idempotent Sync Endpoint (`POST /api/sync`)
* Accept an array of sync operations.
* Use `operationId` / `clientSessionId` to verify if the session or entry was already saved to MongoDB.
* If session exists, perform update; if new, insert.
* Guarantee that re-sending the same batch 5 times produces exactly 1 database entry (idempotent design).

### 4. Sync Status UI Component (`SyncBadge.tsx`)
* Top header/nav status indicator:
  * 🟢 **Synced:** All data backed up to cloud.
  * 🟡 **Syncing...:** Background upload in progress.
  * 🟠 **Offline — Saved Locally:** Internet offline, all data safe in IndexedDB.
* **Manual Sync Action:** Add a `"Force Sync Now"` button in SettingsView for user control.

---

## 🧪 Acceptance Criteria
1. Completing a workout offline creates a pending item in `syncQueue`.
2. Reconnecting to internet automatically triggers sync without user intervention.
3. Server receives sync payload and inserts/updates MongoDB idempotently.
4. UI status indicator updates dynamically based on network and sync queue state.
