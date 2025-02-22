import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@/shared/layouts/auth';
import { DefaultLayout } from '@/shared/layouts/default';
import { VirtanceLayout } from '@/widgets/layouts/virtance-layout';
import { lazy, Suspense } from 'react';
import { ImagesLayout } from '@/widgets/layouts/images-layout';
import { FirewallLayout } from '@/widgets/layouts/firewall-layout';

const SignIn = lazy(() => import('@/pages/sign-in'));
const SignUp = lazy(() => import('@/pages/sign-up'));
const ResetPassword = lazy(() => import('@/pages/reset-password'));
const ConfirmEmail = lazy(() => import('@/pages/confirm-email'));
const CreateVirtance = lazy(() => import('@/pages/virtances/create/create'));
const Virtances = lazy(() => import('@/pages/virtances/virtances'));
const VirtanceOverview = lazy(() => import('@/pages/virtances/virtance/overview'));
const VirtanceGraphs = lazy(() => import('@/pages/virtances/virtance/graphs'));
const VirtanceNetwork = lazy(() => import('@/pages/virtances/virtance/network'));
const VirtanceResize = lazy(() => import('@/pages/virtances/virtance/resize'));
const VirtanceHistory = lazy(() => import('@/pages/virtances/virtance/history'));
const VirtanceSettings = lazy(() => import('@/pages/virtances/virtance/settings'));
const VirtanceSnapshots = lazy(() => import('@/pages/virtances/virtance/snapshots'));
const VirtanceBackups = lazy(() => import('@/pages/virtances/virtance/backups'));
const VirtanceConsole = lazy(() => import('@/pages/virtances/virtance/console'));
const Keypairs = lazy(() => import('@/pages/keypairs/keypairs'));
const Firewalls = lazy(() => import('@/pages/firewalls/firewalls'));
const FirewallRules = lazy(() => import('@/pages/firewalls/rules'));
const FirewallVirtances = lazy(() => import('@/pages/firewalls/virtances'));
const ImagesSnapshots = lazy(() => import('@/pages/images/snapshots'));
const ImagesBackups = lazy(() => import('@/pages/images/backups'));
const Settings = lazy(() => import('@/pages/settings'));
const NotFound = lazy(() => import('@/pages/not-found'));

export function Routing() {
  const isAuthenticated = !!window.localStorage.getItem('token');

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route
            path="/"
            element={
              <Suspense>
                <Virtances />
              </Suspense>
            }
          />
          <Route
            path="/virtances/create"
            element={
              <Suspense>
                <CreateVirtance />
              </Suspense>
            }
          />
          <Route
            path="/keypairs"
            element={
              <Suspense>
                <Keypairs />
              </Suspense>
            }
          />
          <Route path="/virtances/:id" element={<VirtanceLayout />}>
            <Route
              index
              element={
                <Suspense>
                  <VirtanceOverview />
                </Suspense>
              }
            />
            <Route
              path="graphs"
              element={
                <Suspense>
                  <VirtanceGraphs />
                </Suspense>
              }
            />
            <Route
              path="network"
              element={
                <Suspense>
                  <VirtanceNetwork />
                </Suspense>
              }
            />
            <Route
              path="resize"
              element={
                <Suspense>
                  <VirtanceResize />
                </Suspense>
              }
            />
            <Route
              path="history"
              element={
                <Suspense>
                  <VirtanceHistory />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense>
                  <VirtanceSettings />
                </Suspense>
              }
            />
            <Route
              path="snapshots"
              element={
                <Suspense>
                  <VirtanceSnapshots />
                </Suspense>
              }
            />
            <Route
              path="backups"
              element={
                <Suspense>
                  <VirtanceBackups />
                </Suspense>
              }
            />
          </Route>

          <Route path="/images" element={<ImagesLayout />}>
            <Route path="" element={<Navigate to="snapshots" />} />
            <Route
              path="snapshots"
              element={
                <Suspense>
                  <ImagesSnapshots />
                </Suspense>
              }
            />
            <Route
              path="backups"
              element={
                <Suspense>
                  <ImagesBackups />
                </Suspense>
              }
            />
          </Route>

          <Route path="/firewalls">
            <Route
              index
              element={
                <Suspense>
                  <Firewalls />
                </Suspense>
              }
            />
          </Route>

          <Route path="/firewalls/:uuid" element={<FirewallLayout />}>
            <Route
              index
              element={
                <Suspense>
                  <FirewallRules />
                </Suspense>
              }
            />
            <Route
              path="virtances"
              element={
                <Suspense>
                  <FirewallVirtances />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/settings"
            element={
              <Suspense>
                <Settings />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/virtances/:id/console"
          element={
            <Suspense>
              <VirtanceConsole />
            </Suspense>
          }
        />
        <Route
          path="/confirm-email/:token"
          element={
            <Suspense>
              <ConfirmEmail />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/sign-in"
          element={
            <Suspense>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense>
              <ResetPassword />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
}
