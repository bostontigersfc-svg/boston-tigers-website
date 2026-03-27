import { useState, Fragment } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Registration, EliteApplication } from "@shared/schema";
import {
  Users, Mail, Phone, Calendar, Search, Lock, TrendingUp, CreditCard,
  Download, Trash2, ChevronDown, ChevronUp, ExternalLink, ClipboardList,
} from "lucide-react";

const ADMIN_PIN = "bostontigers2024";

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      localStorage.setItem("admin_unlocked", "true");
      onUnlock();
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">
      <Card className="w-full max-w-sm border border-white/10 bg-white/5">
        <CardContent className="p-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white font-black text-2xl mb-1">Admin Access</h1>
          <p className="text-white/40 text-sm mb-8">Enter your PIN to view the dashboard</p>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false); }}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/30 text-center tracking-widest"
              data-testid="input-admin-pin"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">Incorrect PIN. Try again.</p>}
            <Button type="submit" className="w-full font-bold bg-white text-black hover:bg-white/90" data-testid="button-admin-unlock">
              Unlock Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function RegistrationsSection() {
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const { data: registrations = [], isLoading } = useQuery<Registration[]>({
    queryKey: ["/api/registrations"],
  });

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.parentName.toLowerCase().includes(q) ||
      r.childName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.includes(q)
    );
  });

  const thisWeek = registrations.filter((r) => {
    if (!r.submittedAt) return false;
    const diff = (Date.now() - new Date(r.submittedAt).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const paymentCounts = registrations.reduce<Record<string, number>>((acc, r) => {
    const method = r.paymentMethod || "Not specified";
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/registrations/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["/api/registrations"],
        (old: Registration[] | undefined) => (old ? old.filter((r) => r.id !== id) : [])
      );
      setConfirmDeleteId(null);
    },
  });

  const exportCSV = () => {
    const headers = ["ID", "Date", "Parent Name", "Email", "Phone", "Child Name", "Age", "Experience", "Payment Method", "Emergency Contact"];
    const rows = registrations.map((r) => [
      r.id,
      r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : "",
      r.parentName, r.email, r.phone, r.childName, r.childAge,
      r.soccerExperience, r.paymentMethod || "", r.emergencyContact,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "boston-tigers-registrations.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const experienceColor = (exp: string) => {
    if (exp === "none") return "bg-blue-100 text-blue-700";
    if (exp === "beginner") return "bg-green-100 text-green-700";
    if (exp === "intermediate") return "bg-yellow-100 text-yellow-700";
    return "bg-purple-100 text-purple-700";
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div />
        <Button onClick={exportCSV} size="sm" className="bg-black text-white hover:bg-black/80 font-bold" data-testid="button-export-csv">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card data-testid="stat-total">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</span>
            </div>
            <p className="text-3xl font-black text-foreground">{registrations.length}</p>
            <p className="text-muted-foreground text-sm mt-1">Registrations</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-this-week">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">This Week</span>
            </div>
            <p className="text-3xl font-black text-foreground">{thisWeek}</p>
            <p className="text-muted-foreground text-sm mt-1">New sign-ups</p>
          </CardContent>
        </Card>
        <Card className="col-span-2" data-testid="stat-payment-methods">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Methods</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(paymentCounts).map(([method, count]) => (
                <Badge key={method} variant="secondary" className="font-semibold">{method}: {count}</Badge>
              ))}
              {Object.keys(paymentCounts).length === 0 && <span className="text-muted-foreground text-sm">No data yet</span>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg font-black">All Registrations</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name, email, phone…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" data-testid="input-search" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-10 text-center text-muted-foreground">Loading registrations…</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">
              {search ? "No results match your search." : "No registrations yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">Parent</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Contact</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">Child</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Experience</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Payment</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id} className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`} data-testid={`row-registration-${r.id}`}>
                      <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {r.submittedAt ? new Date(r.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                        </div>
                      </td>
                      <td className="px-5 py-4"><p className="font-semibold text-foreground">{r.parentName}</p></td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1.5 text-muted-foreground"><Mail className="w-3 h-3 shrink-0" />{r.email}</span>
                          <span className="flex items-center gap-1.5 text-muted-foreground"><Phone className="w-3 h-3 shrink-0" />{r.phone}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground">{r.childName}</p>
                        <p className="text-muted-foreground text-xs">Age {r.childAge}</p>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <Badge className={`capitalize font-semibold text-xs border-0 ${experienceColor(r.soccerExperience)}`}>{r.soccerExperience}</Badge>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-muted-foreground capitalize">{r.paymentMethod || "—"}</span>
                      </td>
                      <td className="px-3 py-4 text-right">
                        {confirmDeleteId === r.id ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">Sure?</span>
                            <Button size="sm" variant="destructive" className="h-7 px-2 text-xs" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(r.id)} data-testid={`button-confirm-delete-${r.id}`}>Yes, delete</Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setConfirmDeleteId(null)} data-testid={`button-cancel-delete-${r.id}`}>Cancel</Button>
                          </div>
                        ) : (
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => setConfirmDeleteId(r.id)} data-testid={`button-delete-${r.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      <p className="text-center text-muted-foreground text-xs mt-6">Showing {filtered.length} of {registrations.length} registrations</p>
    </>
  );
}

function EliteApplicationsSection() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const { data: applications = [], isLoading } = useQuery<EliteApplication[]>({
    queryKey: ["/api/elite-applications"],
  });

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.playerName.toLowerCase().includes(q) ||
      a.parentName.toLowerCase().includes(q) ||
      a.parentEmail.toLowerCase().includes(q) ||
      a.highSchool.toLowerCase().includes(q) ||
      a.currentTeam.toLowerCase().includes(q)
    );
  });

  const thisWeek = applications.filter((a) => {
    if (!a.submittedAt) return false;
    const diff = (Date.now() - new Date(a.submittedAt).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/elite-applications/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["/api/elite-applications"],
        (old: EliteApplication[] | undefined) => (old ? old.filter((a) => a.id !== id) : [])
      );
      setConfirmDeleteId(null);
      if (expandedId === id) setExpandedId(null);
    },
  });

  const exportCSV = () => {
    const headers = [
      "ID", "Date", "Player Name", "Age", "Grade", "High School", "Current Team",
      "Primary Position", "Secondary Position", "Dominant Foot",
      "Parent Name", "Parent Email", "Parent Phone",
      "Years Playing", "Goal Level", "Improve Area", "Highlight Video", "Why Join",
    ];
    const rows = applications.map((a) => [
      a.id,
      a.submittedAt ? new Date(a.submittedAt).toLocaleDateString() : "",
      a.playerName, a.playerAge, a.grade, a.highSchool, a.currentTeam,
      a.primaryPosition, a.secondaryPosition || "", a.dominantFoot,
      a.parentName, a.parentEmail, a.parentPhone,
      a.yearsPlaying, a.goalLevel, a.improveArea, a.highlightVideo || "", a.whyJoin,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "boston-tigers-elite-applications.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const goalColor = (goal: string) => {
    if (goal === "Professional") return "bg-purple-100 text-purple-700";
    if (goal === "College Soccer") return "bg-blue-100 text-blue-700";
    if (goal === "High School Varsity") return "bg-green-100 text-green-700";
    return "bg-muted text-muted-foreground";
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div />
        <Button onClick={exportCSV} size="sm" className="bg-black text-white hover:bg-black/80 font-bold" data-testid="button-export-elite-csv">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card data-testid="stat-elite-total">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardList className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</span>
            </div>
            <p className="text-3xl font-black text-foreground">{applications.length}</p>
            <p className="text-muted-foreground text-sm mt-1">Applications</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-elite-this-week">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">This Week</span>
            </div>
            <p className="text-3xl font-black text-foreground">{thisWeek}</p>
            <p className="text-muted-foreground text-sm mt-1">New applications</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg font-black">Elite Applications</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search player, parent, school…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" data-testid="input-elite-search" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-10 text-center text-muted-foreground">Loading applications…</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">
              {search ? "No results match your search." : "No applications yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">Player</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Parent Contact</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Position</th>
                    <th className="text-left px-5 py-3 font-bold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Goal</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <Fragment key={a.id}>
                      <tr
                        className={`border-b border-border hover:bg-muted/30 transition-colors cursor-pointer ${expandedId === a.id ? "bg-muted/20" : i % 2 === 0 ? "" : "bg-muted/10"}`}
                        onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
                        data-testid={`row-elite-${a.id}`}
                      >
                        <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            {a.submittedAt ? new Date(a.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-foreground">{a.playerName}</p>
                          <p className="text-muted-foreground text-xs">Age {a.playerAge} · {a.grade} Grade · {a.highSchool}</p>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-foreground">{a.parentName}</span>
                            <span className="flex items-center gap-1.5 text-muted-foreground"><Mail className="w-3 h-3 shrink-0" />{a.parentEmail}</span>
                            <span className="flex items-center gap-1.5 text-muted-foreground"><Phone className="w-3 h-3 shrink-0" />{a.parentPhone}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <p className="text-foreground font-medium">{a.primaryPosition}</p>
                          {a.secondaryPosition && <p className="text-muted-foreground text-xs">{a.secondaryPosition}</p>}
                          <p className="text-muted-foreground text-xs mt-0.5">{a.dominantFoot} foot</p>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <Badge className={`font-semibold text-xs border-0 ${goalColor(a.goalLevel)}`}>{a.goalLevel}</Badge>
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button
                              size="icon" variant="ghost"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
                              data-testid={`button-expand-${a.id}`}
                              aria-label="Toggle details"
                            >
                              {expandedId === a.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>
                            {confirmDeleteId === a.id ? (
                              <>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">Sure?</span>
                                <Button size="sm" variant="destructive" className="h-7 px-2 text-xs" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(a.id)} data-testid={`button-confirm-delete-elite-${a.id}`}>Yes</Button>
                                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setConfirmDeleteId(null)} data-testid={`button-cancel-delete-elite-${a.id}`}>No</Button>
                              </>
                            ) : (
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => setConfirmDeleteId(a.id)} data-testid={`button-delete-elite-${a.id}`}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded detail row */}
                      {expandedId === a.id && (
                        <tr className="bg-muted/30 border-b border-border">
                          <td colSpan={6} className="px-5 py-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
                              <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Team & Background</p>
                                <p><span className="text-muted-foreground">Club:</span> <span className="font-medium">{a.currentTeam}</span></p>
                                <p><span className="text-muted-foreground">Years playing:</span> <span className="font-medium">{a.yearsPlaying}</span></p>
                                <p><span className="text-muted-foreground">Goal:</span> <span className="font-medium">{a.goalLevel}</span></p>
                                <p><span className="text-muted-foreground">Focus area:</span> <span className="font-medium">{a.improveArea}</span></p>
                              </div>
                              {a.highlightVideo && (
                                <div>
                                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Highlight Video</p>
                                  <a href={a.highlightVideo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:underline font-medium" data-testid={`link-video-${a.id}`}>
                                    <ExternalLink className="w-3.5 h-3.5" /> Watch Video
                                  </a>
                                </div>
                              )}
                              <div className="sm:col-span-2 lg:col-span-3">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Why They Want to Join</p>
                                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{a.whyJoin}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      <p className="text-center text-muted-foreground text-xs mt-6">Showing {filtered.length} of {applications.length} applications</p>
    </>
  );
}

function Dashboard() {
  const [tab, setTab] = useState<"registrations" | "elite">("registrations");

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-black border-b border-white/10 px-5 sm:px-8 py-5">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Boston Tigers" className="h-12 w-auto" />
            <div>
              <h1 className="text-white font-black text-lg leading-tight">Admin Dashboard</h1>
              <p className="text-white/40 text-xs">Boston Tigers Youth Soccer Clinics</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mt-5 flex gap-1">
          <button
            onClick={() => setTab("registrations")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === "registrations" ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/10"}`}
            data-testid="tab-registrations"
          >
            <Users className="w-4 h-4 inline-block mr-2 -mt-0.5" />
            Registrations
          </button>
          <button
            onClick={() => setTab("elite")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === "elite" ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/10"}`}
            data-testid="tab-elite"
          >
            <ClipboardList className="w-4 h-4 inline-block mr-2 -mt-0.5" />
            Elite Applications
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        {tab === "registrations" ? <RegistrationsSection /> : <EliteApplicationsSection />}
      </div>
    </div>
  );
}

export default function Admin() {
  const params = new URLSearchParams(window.location.search);
  const [unlocked, setUnlocked] = useState(
    localStorage.getItem("admin_unlocked") === "true" ||
    params.get("key") === ADMIN_PIN
  );

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;
  return <Dashboard />;
}
