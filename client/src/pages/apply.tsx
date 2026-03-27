import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const applySchema = z.object({
  playerName: z.string().min(1, "Required"),
  playerAge: z.string().min(1, "Required"),
  grade: z.string().min(1, "Required"),
  highSchool: z.string().min(1, "Required"),
  currentTeam: z.string().min(1, "Required"),
  primaryPosition: z.string().min(1, "Required"),
  secondaryPosition: z.string().optional(),
  dominantFoot: z.string().min(1, "Required"),
  parentName: z.string().min(1, "Required"),
  parentEmail: z.string().email("Enter a valid email"),
  parentPhone: z.string().min(1, "Required"),
  yearsPlaying: z.string().min(1, "Required"),
  goalLevel: z.string().min(1, "Required"),
  improveArea: z.string().min(1, "Required"),
  highlightVideo: z.string().optional(),
  whyJoin: z.string().min(10, "Please tell us a bit more (min 10 characters)"),
  acceptedCommitment: z.boolean().refine((v) => v === true, { message: "You must accept the commitment expectations" }),
  acceptedWaiver: z.boolean().refine((v) => v === true, { message: "You must accept the waiver" }),
  acceptedGuardian: z.boolean().refine((v) => v === true, { message: "You must confirm you are the parent/legal guardian" }),
});

type ApplyFormValues = z.infer<typeof applySchema>;

const step1Fields: (keyof ApplyFormValues)[] = [
  "playerName", "playerAge", "grade", "highSchool", "currentTeam",
  "primaryPosition", "dominantFoot", "parentName", "parentEmail", "parentPhone",
];
const step2Fields: (keyof ApplyFormValues)[] = [
  "yearsPlaying", "goalLevel", "improveArea", "whyJoin",
];
const step3Fields: (keyof ApplyFormValues)[] = [
  "acceptedCommitment", "acceptedWaiver", "acceptedGuardian",
];

const POSITIONS = [
  "Goalkeeper", "Center Back", "Right Back", "Left Back",
  "Defensive Midfielder", "Central Midfielder", "Attacking Midfielder",
  "Right Winger", "Left Winger", "Striker / Forward",
];

const STEPS = ["Player Profile", "Background & Goals", "Commitment & Waiver"];

export default function Apply() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      playerName: "", playerAge: "", grade: "", highSchool: "",
      currentTeam: "", primaryPosition: "", secondaryPosition: "",
      dominantFoot: "", parentName: "", parentEmail: "", parentPhone: "",
      yearsPlaying: "", goalLevel: "", improveArea: "",
      highlightVideo: "", whyJoin: "",
      acceptedCommitment: false, acceptedWaiver: false, acceptedGuardian: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ApplyFormValues) =>
      apiRequest("POST", "/api/elite-applications", data),
    onSuccess: () => setSubmitted(true),
  });

  const goNext = async () => {
    const fields = step === 0 ? step1Fields : step2Fields;
    const valid = await form.trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = (data: ApplyFormValues) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">

          {/* Logo */}
          <img src="/logo.png" alt="Boston Tigers" className="h-20 w-auto mx-auto mb-8 opacity-90" />

          {/* Icon */}
          <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-background" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
            Thank You!
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/30 mb-6">
            Application Received
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
            <div className="h-px w-16 bg-border" />
          </div>

          {/* Message */}
          <div className="bg-card border border-border rounded-2xl px-6 sm:px-8 py-6 sm:py-8 mb-8 text-left space-y-4">
            <p className="text-foreground font-semibold text-base sm:text-lg leading-snug">
              Thank you for applying to the Boston Tigers Elite Development Program.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We appreciate your interest and look forward to reviewing your application. Our team will carefully evaluate each submission and reach out soon with the next steps.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              In the meantime, feel free to explore the Elite Development page to learn more about our coaching staff and program structure.
            </p>
          </div>

          {/* CTA */}
          <Link href="/elite-development">
            <Button className="bg-foreground text-background hover:bg-foreground/85 font-bold px-8 py-2.5" data-testid="button-back-elite">
              Back to Elite Development
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 overflow-x-hidden">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link href="/elite-development" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" />
            Back to Elite Development
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Elite Development Application
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Boston Tigers FC — Complete all three steps to submit your application.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8" data-testid="step-indicator">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 transition-colors ${
                i < step ? "bg-foreground text-background" :
                i === step ? "bg-foreground text-background" :
                "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`h-px flex-1 transition-colors ${i < step ? "bg-foreground/40" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            {/* ── STEP 1: Player Profile ── */}
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-foreground">Player Profile</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="playerName" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Player Full Name</FormLabel>
                      <FormControl><Input placeholder="Full name" {...field} data-testid="input-player-name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="playerAge" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl><Input placeholder="e.g. 15" type="number" min="5" max="25" {...field} data-testid="input-player-age" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="grade" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-grade">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["6th", "7th", "8th", "9th", "10th", "11th", "12th"].map((g) => (
                            <SelectItem key={g} value={g}>{g} Grade</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="highSchool" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>High School</FormLabel>
                      <FormControl><Input placeholder="School name" {...field} data-testid="input-high-school" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="currentTeam" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Current Team / Club</FormLabel>
                      <FormControl><Input placeholder="Team or club name" {...field} data-testid="input-current-team" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="primaryPosition" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Position</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-primary-position">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {POSITIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="secondaryPosition" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Position <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-secondary-position">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {POSITIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="dominantFoot" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dominant Foot</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-dominant-foot">
                            <SelectValue placeholder="Select foot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Right">Right</SelectItem>
                          <SelectItem value="Left">Left</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="border-t pt-5 space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Parent / Guardian</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="parentName" render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Parent / Guardian Full Name</FormLabel>
                        <FormControl><Input placeholder="Full name" {...field} data-testid="input-parent-name" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="parentEmail" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="email@example.com" type="email" {...field} data-testid="input-parent-email" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="parentPhone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl><Input placeholder="(000) 000-0000" type="tel" {...field} data-testid="input-parent-phone" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Soccer Background & Goals ── */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-foreground">Soccer Background & Goals</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="yearsPlaying" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years Playing Competitive Soccer</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-years-playing">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-2">0 – 2 years</SelectItem>
                          <SelectItem value="3-5">3 – 5 years</SelectItem>
                          <SelectItem value="6+">6+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="goalLevel" render={({ field }) => (
                    <FormItem>
                      <FormLabel>What Level Do You Want to Reach?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-goal-level">
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="High School Varsity">High School Varsity</SelectItem>
                          <SelectItem value="College Soccer">College Soccer</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Improve Overall Level">Improve Overall Level</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="improveArea" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Main Area You Want to Improve</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-improve-area">
                            <SelectValue placeholder="Select area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technical Ability">Technical Ability</SelectItem>
                          <SelectItem value="Tactical Understanding">Tactical Understanding</SelectItem>
                          <SelectItem value="Physical Strength">Physical Strength</SelectItem>
                          <SelectItem value="Confidence / Mindset">Confidence / Mindset</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="highlightVideo" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Highlight Video Link <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                      <FormControl><Input placeholder="YouTube, Hudl, or other link" {...field} data-testid="input-highlight-video" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="whyJoin" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to join the Boston Tigers Elite Development Program?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself, your goals, and why this program is right for you..."
                        className="min-h-[140px] resize-none"
                        {...field}
                        data-testid="textarea-why-join"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            {/* ── STEP 3: Commitment & Waiver ── */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-foreground">Commitment & Waiver</h2>

                {/* Commitment block */}
                <div className="bg-muted rounded-xl p-4 sm:p-5 space-y-4">
                  <h3 className="font-semibold text-foreground text-sm">Commitment Expectations</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Boston Tigers Elite Development Program is designed for players who are serious about improving their game. By submitting this application, I understand that participation requires discipline, effort, consistency, and respect. I understand that players are expected to arrive on time, train with focus, respect coaches and teammates, and take responsibility for their development outside of scheduled sessions. I understand that submitting this application does not guarantee participation or placement in the program.
                  </p>
                  <FormField control={form.control} name="acceptedCommitment" render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-commitment"
                        />
                      </FormControl>
                      <div>
                        <FormLabel className="font-medium text-sm leading-snug cursor-pointer">
                          I understand and accept the commitment expectations of the program.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />
                </div>

                {/* Waiver block */}
                <div className="bg-muted rounded-xl p-4 sm:p-5 space-y-4">
                  <h3 className="font-semibold text-foreground text-sm">Waiver & Participation Terms</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                    <p>I understand that participation in soccer training, conditioning, scrimmages, and related athletic activities involves inherent physical risks, including but not limited to falls, collisions, contact with other players, overexertion, sprains, strains, fractures, head injuries, and other minor or serious injuries. I voluntarily choose to allow my child to participate and fully accept these risks.</p>
                    <p>On behalf of myself and my child, I release and hold harmless Boston Tigers FC LLC, its owners, coaches, trainers, staff, volunteers, and affiliates from any and all claims, liabilities, damages, losses, or causes of action arising out of or related to participation in the program, except where prohibited by law.</p>
                    <p>I confirm that my child is physically able to participate in training and related activities. I understand that it is my responsibility to disclose any injuries, medical conditions, limitations, or other health concerns before participation. In the event of an injury or medical emergency, I authorize program staff to seek emergency medical care for my child if I cannot be reached immediately.</p>
                    <p>I understand that this application does not guarantee acceptance or placement in the program.</p>
                    <p><span className="font-semibold text-foreground">Media Release & Promotional Use:</span> I hereby grant Boston Tigers FC LLC permission to photograph, record video of, and collect testimonials from my child in connection with participation in the program. I authorize Boston Tigers FC LLC to use such photographs, video footage, and testimonials for promotional, educational, and marketing purposes — including but not limited to social media, the program website, printed materials, and advertising — without compensation to myself or my child. I understand that images and footage may be edited, combined with other media, and distributed publicly. I may revoke this permission in writing at any time; revocation will not affect materials already published.</p>
                  </div>
                  <div className="space-y-3 pt-1">
                    <FormField control={form.control} name="acceptedWaiver" render={({ field }) => (
                      <FormItem className="flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-waiver"
                          />
                        </FormControl>
                        <div>
                          <FormLabel className="font-medium text-sm leading-snug cursor-pointer">
                            I have read and agree to the waiver and participation terms.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="acceptedGuardian" render={({ field }) => (
                      <FormItem className="flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-guardian"
                          />
                        </FormControl>
                        <div>
                          <FormLabel className="font-medium text-sm leading-snug cursor-pointer">
                            I am the parent/legal guardian of the player listed above and I agree to these terms on their behalf.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep((s) => s - 1)}
                  data-testid="button-prev-step"
                  className="gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <Button
                  type="button"
                  onClick={goNext}
                  data-testid="button-next-step"
                  className="gap-1.5"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  data-testid="button-submit-application"
                  className="px-8"
                >
                  {mutation.isPending ? "Submitting…" : "Submit Application"}
                </Button>
              )}
            </div>

            {mutation.isError && (
              <p className="text-sm text-destructive mt-3 text-center" data-testid="text-submit-error">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
