import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ChevronLeft,
  CreditCard,
  CheckCircle2,
  Shield,
  Loader2,
  Lock,
  Gift,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  parentName: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone"),
  childName: z.string().min(2, "Required"),
  childAge: z.string().min(1, "Required"),
  soccerExperience: z.string().min(1, "Required"),
  emergencyContact: z.string().min(2, "Required"),
  waiverAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the waiver" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const PLANS = [
  {
    id: "free_trial",
    name: "1 Month Free Trial",
    price: 0,
    priceLabel: "$0.00",
    billingLabel: "free for 1 month",
    badge: null,
    description: "Try a full month at no cost — no card required",
    features: [
      "Full access for 1 month",
      "All clinic sessions included",
      "Professional coaching",
      "No commitment",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: 99,
    priceLabel: "$99",
    billingLabel: "per month",
    badge: null,
    description: "Ongoing access billed monthly — cancel anytime",
    features: [
      "All clinic sessions every month",
      "Professional coaching & drills",
      "Skill assessments & feedback",
      "Certificate of completion",
    ],
    cta: "Subscribe · $99/mo",
  },
];

export default function Register() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("monthly");
  const selectedPlanRef = useRef("monthly");
  const cancelled = new URLSearchParams(window.location.search).get("cancelled");

  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) ?? PLANS[0];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "", email: "", phone: "", childName: "",
      childAge: "", soccerExperience: "", emergencyContact: "",
      waiverAccepted: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Omit<FormValues, "waiverAccepted"> & { plan: string }) => {
      const res = await apiRequest("POST", "/api/checkout", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (!data.url) return;
      if (data.url.startsWith("http")) {
        window.location.href = data.url; // external Stripe URL
      } else {
        navigate(data.url); // internal success page — use router
      }
    },
    onError: (err: any) => {
      toast({ title: "Couldn't start checkout", description: err.message ?? "Please try again.", variant: "destructive" });
    },
  });

  const onSubmit = (values: FormValues) => {
    const { waiverAccepted: _, ...rest } = values;
    const plan = selectedPlanRef.current;
    console.log("[Register] submitting with plan:", plan);
    mutation.mutate({ ...rest, plan });
  };

  const ages = Array.from({ length: 13 }, (_, i) => i + 4);
  const childName = form.watch("childName");
  const childAge = form.watch("childAge");

  return (
    <div className="flex flex-col bg-background overflow-x-hidden min-h-screen md:h-screen md:overflow-hidden">

      {/* Navbar */}
      <nav className="bg-black border-b border-white/10 shrink-0 z-50" data-testid="register-navbar">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 group" data-testid="link-back-home">
              <ChevronLeft className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0" />
              <img src="/logo.png" alt="Boston Tigers" className="h-10 w-auto" />
              <div className="flex flex-col justify-center">
                <span className="text-white font-black text-xs leading-tight tracking-tight">BOSTON TIGERS</span>
                <span className="text-white/50 font-semibold text-[9px] tracking-widest uppercase leading-tight">Youth Soccer Clinics</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              {cancelled && (
                <span className="text-yellow-400 text-xs font-semibold">Payment cancelled — try again below</span>
              )}
              <Badge variant="secondary" className="text-xs font-semibold">Registration</Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Body — stacks on mobile, side-by-side on md+ */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row md:h-full w-full">

            {/* ── LEFT: Player Info ── */}
            <div className="flex-1 md:overflow-y-auto border-b md:border-b-0 md:border-r border-border px-4 sm:px-8 py-6" data-testid="card-registration-form">
              <div className="mb-5">
                <h2 className="font-black text-foreground text-xl tracking-tight">Player Information</h2>
                <p className="text-muted-foreground text-xs mt-0.5">All fields are required.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="parentName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">Parent / Guardian Name</FormLabel>
                      <FormControl><Input placeholder="Sarah Johnson" {...field} data-testid="input-parent-name" className="h-9 text-sm" /></FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="sarah@example.com" {...field} data-testid="input-email" className="h-9 text-sm" /></FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">Phone Number</FormLabel>
                      <FormControl><Input type="tel" placeholder="(617) 000-0000" {...field} data-testid="input-phone" className="h-9 text-sm" /></FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="emergencyContact" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">Emergency Contact</FormLabel>
                      <FormControl><Input placeholder="Name & phone" {...field} data-testid="input-emergency-contact" className="h-9 text-sm" /></FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Child Details</p>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="childName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-xs">Child's Name</FormLabel>
                        <FormControl><Input placeholder="Alex Johnson" {...field} data-testid="input-child-name" className="h-9 text-sm" /></FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="childAge" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-xs">Age</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-child-age" className="h-9 text-sm">
                              <SelectValue placeholder="Select age" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ages.map((age) => (
                              <SelectItem key={age} value={String(age)}>{age} yrs</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="soccerExperience" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-xs">Experience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-soccer-experience" className="h-9 text-sm">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">No experience</SelectItem>
                            <SelectItem value="beginner">Beginner (0–1 yr)</SelectItem>
                            <SelectItem value="recreational">Recreational (1–3 yrs)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (3–5 yrs)</SelectItem>
                            <SelectItem value="advanced">Advanced (5+ yrs)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* Waiver */}
                <div className="border border-border rounded-md overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/40 border-b border-border">
                    <Shield className="w-4 h-4 text-foreground/50 shrink-0" />
                    <h4 className="font-bold text-xs text-foreground">Liability Waiver & Consent</h4>
                  </div>
                  <div className="h-36 overflow-y-auto px-4 py-3 bg-background space-y-2">
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      By registering my child for participation in Boston Tigers Football Club training sessions, clinics, camps, or related soccer activities, I acknowledge and agree to the following:
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      I understand that participation in soccer and athletic training involves inherent risks of injury. These risks include, but are not limited to, falls, collisions with other participants, contact with equipment, weather conditions, and other risks associated with physical activity. Injuries may range from minor sprains and bruises to serious injuries including permanent disability or death.
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      I acknowledge that my child is voluntarily participating in these activities and that I assume all risks associated with participation.
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      To the fullest extent permitted by law, I release, waive, and discharge Boston Tigers Football Club, its owners, coaches, staff, volunteers, partners, and any facilities used for training from any and all liability, claims, demands, or causes of action arising out of or related to my child's participation in any Boston Tigers activities, whether caused by negligence or otherwise.
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      I certify that my child is physically able to participate in soccer training and has no medical conditions that would prevent safe participation. I agree to inform program staff of any relevant medical conditions, injuries, or limitations prior to participation.
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      In the event of injury or medical emergency, I authorize Boston Tigers Football Club staff to obtain medical treatment for my child if I cannot be reached. I understand that I am responsible for any medical expenses incurred.
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      I understand that Boston Tigers Football Club may take photographs or video recordings during training sessions for promotional or educational purposes. By registering my child, I grant permission for my child's image to be used in such materials unless I provide written notice requesting otherwise.
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      I acknowledge that my child must follow the instructions of coaches and staff at all times and that unsafe or disruptive behavior may result in removal from the program.
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      By checking the agreement box and submitting registration, I confirm that I am the parent or legal guardian of the participant, that I have read and understand this waiver, and that I voluntarily agree to all terms stated above on behalf of myself and my child.
                    </p>
                  </div>
                  <div className="px-4 py-3 border-t border-border bg-muted/20">
                    <FormField control={form.control} name="waiverAccepted" render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} data-testid="checkbox-waiver" />
                          </FormControl>
                          <Label
                            className="text-xs font-semibold cursor-pointer leading-snug"
                            onClick={() => field.onChange(!field.value)}
                          >
                            I have read and agree to the liability waiver and consent above
                          </Label>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Plans + Checkout ── */}
            <div className="w-full md:w-80 xl:w-96 md:shrink-0 md:overflow-y-auto px-4 sm:px-6 py-6 bg-muted/20 flex flex-col gap-4">
              <div>
                <h2 className="font-black text-foreground text-xl tracking-tight">Select a Plan</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Choose the option that works for you.</p>
              </div>

              {/* Plan cards */}
              <div className="space-y-3">
                {PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => { setSelectedPlanId(plan.id); selectedPlanRef.current = plan.id; }}
                      className={`relative w-full text-left rounded-lg p-4 border-2 transition-all ${
                        isSelected
                          ? "border-foreground bg-card"
                          : "border-border bg-card/50 hover:border-foreground/40"
                      }`}
                      data-testid={`plan-card-${plan.id}`}
                    >
                      {plan.id === "free_trial" && (
                        <span className="absolute -top-2.5 left-4 bg-muted border border-border text-foreground text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Gift className="w-2.5 h-2.5" /> Free Trial
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-2 mt-1">
                        <div className="flex items-start gap-2.5">
                          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-foreground" : "border-border"}`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-foreground" />}
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm">{plan.name}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">{plan.description}</p>
                            <ul className="mt-2 space-y-1">
                              {plan.features.map((f) => (
                                <li key={f} className="flex items-center gap-1.5 text-xs text-foreground/75">
                                  <CheckCircle2 className="w-3 h-3 text-foreground/50 shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-2xl font-black text-foreground">{plan.priceLabel}</p>
                          <p className="text-muted-foreground text-[10px]">{plan.billingLabel}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Order summary */}
              <div className="border border-border rounded-lg overflow-hidden bg-card" data-testid="card-order-summary">
                <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                  <p className="font-bold text-xs text-foreground uppercase tracking-widest">Order Summary</p>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{selectedPlan.name}</span>
                    <span className="font-bold text-foreground">{selectedPlan.priceLabel}</span>
                  </div>
                  {(childName || childAge) && (
                    <p className="text-xs text-muted-foreground">
                      {childName && `Player: ${childName}`}{childAge && ` · Age ${childAge}`}
                    </p>
                  )}
                  <div className="border-t border-border pt-2 flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">
                      {selectedPlan.id === "monthly" ? "Due today" : "Total"}
                    </span>
                    <span className="font-black text-lg text-foreground">{selectedPlan.priceLabel}</span>
                  </div>
                  {selectedPlan.id === "monthly" && (
                    <p className="text-xs text-muted-foreground">Then $99/month until cancelled</p>
                  )}
                  {selectedPlan.id === "free_trial" && (
                    <p className="text-xs text-muted-foreground">No card required · free for 1 month</p>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 mt-auto">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold tracking-wide"
                  disabled={mutation.isPending}
                  data-testid="button-pay-stripe"
                >
                  {mutation.isPending ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      {selectedPlan.id === "free_trial" ? "Setting up…" : "Redirecting…"}
                    </>
                  ) : (
                    <>
                      {selectedPlan.id === "monthly"
                        ? <CreditCard className="mr-2 w-4 h-4" />
                        : <Gift className="mr-2 w-4 h-4" />
                      }
                      {selectedPlan.cta}
                    </>
                  )}
                </Button>
                {selectedPlan.id === "monthly" && (
                  <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-[10px]">
                    <Lock className="w-3 h-3" />
                    <span>Secured by Stripe · Cancel anytime</span>
                  </div>
                )}
                {selectedPlan.id === "free_trial" && (
                  <p className="text-center text-muted-foreground text-[10px]">No payment info needed to start</p>
                )}
              </div>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
