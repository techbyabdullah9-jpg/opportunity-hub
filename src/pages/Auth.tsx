import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Calendar,
  Globe,
  BookOpen,
  Briefcase,
  Linkedin,
  Globe as GlobeIcon,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const studentSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Please select your country"),
  city: z.string().min(2, "City is required"),
  dateOfBirth: z.string().optional(),
  learningInterests: z.array(z.string()).min(1, "Select at least one interest"),
  preferredLanguage: z.string().min(1, "Please select a language"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const instructorSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  displayName: z.string().min(2, "Display name is required"),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Please select your country"),
  city: z.string().min(2, "City is required"),
  headline: z.string().min(5, "Professional headline is required"),
  teachingCategories: z.array(z.string()).min(1, "Select at least one category"),
  yearsOfExperience: z.string().min(1, "Experience is required"),
  bio: z.string().min(20, "Bio must be at least 20 characters").optional(),
  languagesSpoken: z.array(z.string()).min(1, "Select at least one language"),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type StudentFormData = z.infer<typeof studentSchema>;
type InstructorFormData = z.infer<typeof instructorSchema>;

const COUNTRIES = [
  "Pakistan", "United States", "United Kingdom", "Canada", "Australia",
  "Saudi Arabia", "UAE", "India", "Bangladesh", "Turkey", "Germany", "Other"
];

const LANGUAGES = [
  "English", "Urdu", "Arabic", "Punjabi", "Sindhi", "Pashto", "Hindi", "Persian", "Turkish", "German"
];

const LEARNING_CATEGORIES = [
  "Languages", "Mathematics", "Science", "Computer Science", "Web Development",
  "Mobile Development", "Data Science", "Quran & Islamic Studies", "Business", "Arts", "Music"
];

const TEACHING_CATEGORIES = [
  "Web Development", "Mobile Development", "Data Science", "Python Programming",
  "Mathematics", "Physics", "Chemistry", "Biology", "English Language", "Urdu Language",
  "Arabic Language", "Quran Studies", "Islamic Studies", "Business Studies", "Accounting",
  "Graphic Design", "Digital Marketing", "SEO", "IELTS Preparation", "SAT Preparation"
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"student" | "instructor" | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  // Student form
  const studentForm = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "", username: "", email: "", phone: "", country: "", city: "",
      dateOfBirth: "", learningInterests: [], preferredLanguage: "",
      password: "", confirmPassword: "", acceptTerms: false,
    },
  });

  // Instructor form
  const instructorForm = useForm<InstructorFormData>({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      fullName: "", displayName: "", username: "", email: "", phone: "",
      country: "", city: "", headline: "", teachingCategories: [],
      yearsOfExperience: "", bio: "", languagesSpoken: [],
      linkedinUrl: "", websiteUrl: "", password: "", confirmPassword: "", acceptTerms: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (authError) throw authError;
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate({ to: "/" }), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentRegister = async (data: StudentFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Check username availability
      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("username", data.username)
        .single();

      if (existingUser) {
        setError("Username is already taken");
        setIsLoading(false);
        return;
      }

      const { error: authError, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            username: data.username,
            role: "student",
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        await supabase.from("user_profiles").insert({
          id: authData.user.id,
          email: data.email,
          full_name: data.fullName,
          username: data.username,
          phone: data.phone || null,
          country: data.country,
          city: data.city,
          date_of_birth: data.dateOfBirth || null,
          role: "student",
        });

        await supabase.from("student_profiles").insert({
          id: authData.user.id,
          learning_interests: data.learningInterests,
          preferred_language: data.preferredLanguage,
        });

        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate({ to: "/" }), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstructorRegister = async (data: InstructorFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Check username availability
      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("username", data.username)
        .single();

      if (existingUser) {
        setError("Username is already taken");
        setIsLoading(false);
        return;
      }

      const { error: authError, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            username: data.username,
            role: "instructor",
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        await supabase.from("user_profiles").insert({
          id: authData.user.id,
          email: data.email,
          full_name: data.fullName,
          username: data.username,
          phone: data.phone,
          country: data.country,
          city: data.city,
          role: "instructor",
        });

        await supabase.from("instructor_profiles").insert({
          id: authData.user.id,
          display_name: data.displayName,
          headline: data.headline,
          bio: data.bio || null,
          years_of_experience: parseInt(data.yearsOfExperience),
          teaching_categories: data.teachingCategories,
          languages_spoken: data.languagesSpoken,
          linkedin_url: data.linkedinUrl || null,
          website_url: data.websiteUrl || null,
        });

        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate({ to: "/" }), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (mode: "login" | "register") => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/auth/callback",
        },
      });
      if (authError) throw authError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google authentication failed");
      setIsLoading(false);
    }
  };

  const handleMicrosoftAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "azure",
        options: {
          redirectTo: window.location.origin + "/auth/callback",
        },
      });
      if (authError) throw authError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Microsoft authentication failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f1]">
      {/* Header */}
      <header className="bg-hero-gradient">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 fill-[#f5c21a] text-[#f5c21a]" />
            <span className="text-xl font-extrabold tracking-wide text-white">
              USTAD <span className="text-[#f5c21a]">HUB</span>
            </span>
          </Link>
          <Link to="/" className="text-sm text-white/70 hover:text-[#f5c21a] transition">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Auth Section */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT SIDE - LOGIN */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Welcome Back
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Sign in to continue your learning journey
                </p>
              </div>

              {error && authMode === "login" && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}
              {success && authMode === "login" && (
                <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-600 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {success}
                </div>
              )}

              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      {...loginForm.register("email")}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-red-500">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      {...loginForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-red-500">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember-me"
                      checked={loginForm.watch("rememberMe")}
                      onCheckedChange={(checked) => loginForm.setValue("rememberMe", checked === true)}
                    />
                    <Label htmlFor="remember-me" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-[#f5c21a] hover:text-[#d4a817] transition"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#f5c21a] text-[#0c1422] hover:bg-[#ffcf33] h-11"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleGoogleAuth("login")}
                    className="h-11"
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleMicrosoftAuth}
                    className="h-11"
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#F25022" d="M1 1h10v10H1z" />
                      <path fill="#00A4EF" d="M1 13h10v10H1z" />
                      <path fill="#7FBA00" d="M13 1h10v10H13z" />
                      <path fill="#FFB900" d="M13 13h10v10H13z" />
                    </svg>
                    Microsoft
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT SIDE - REGISTRATION */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-2xl bg-[#142033] p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-white">
                  Join UstadHub
                </h2>
                <p className="mt-1 text-sm text-[#d0d4dc]">
                  Learn & Teach Worldwide
                </p>
              </div>

              {/* Role Selection */}
              {!selectedRole && (
                <div className="space-y-4">
                  <p className="text-sm text-[#d0d4dc]">
                    Select your role to get started:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setSelectedRole("student");
                        setAuthMode("register");
                      }}
                      className="rounded-xl border-2 border-[#f5c21a]/30 bg-white/5 p-6 text-center transition hover:border-[#f5c21a] hover:bg-[#f5c21a]/10"
                    >
                      <BookOpen className="mx-auto h-8 w-8 text-[#f5c21a]" />
                      <p className="mt-3 font-semibold text-white">Student</p>
                      <p className="mt-1 text-xs text-[#d0d4dc]">I want to learn</p>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRole("instructor");
                        setAuthMode("register");
                      }}
                      className="rounded-xl border-2 border-[#f5c21a]/30 bg-white/5 p-6 text-center transition hover:border-[#f5c21a] hover:bg-[#f5c21a]/10"
                    >
                      <Briefcase className="mx-auto h-8 w-8 text-[#f5c21a]" />
                      <p className="mt-3 font-semibold text-white">Instructor</p>
                      <p className="mt-1 text-xs text-[#d0d4dc]">I want to teach</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Student Registration Form */}
              <AnimatePresence mode="wait">
                {selectedRole === "student" && (
                  <motion.div
                    key="student-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-[#f5c21a]" />
                        <span className="font-semibold text-white">Student Registration</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedRole(null)}
                        className="text-xs text-[#d0d4dc] hover:text-[#f5c21a]"
                      >
                        Change Role
                      </button>
                    </div>

                    {error && (
                      <div className="mb-4 rounded-lg bg-red-900/30 p-3 text-sm text-red-300">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="mb-4 rounded-lg bg-emerald-900/30 p-3 text-sm text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        {success}
                      </div>
                    )}

                    <form onSubmit={studentForm.handleSubmit(handleStudentRegister)} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="text"
                              placeholder="John Doe"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...studentForm.register("fullName")}
                            />
                          </div>
                          {studentForm.formState.errors.fullName && (
                            <p className="text-xs text-red-400">{studentForm.formState.errors.fullName.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Username</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                            <Input
                              type="text"
                              placeholder="johndoe"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...studentForm.register("username")}
                            />
                          </div>
                          {studentForm.formState.errors.username && (
                            <p className="text-xs text-red-400">{studentForm.formState.errors.username.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                            {...studentForm.register("email")}
                          />
                        </div>
                        {studentForm.formState.errors.email && (
                          <p className="text-xs text-red-400">{studentForm.formState.errors.email.message}</p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Phone (Optional)</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="tel"
                              placeholder="+92 300 1234567"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...studentForm.register("phone")}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Date of Birth (Optional)</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="date"
                              className="pl-10 bg-white/10 border-white/20 text-white"
                              {...studentForm.register("dateOfBirth")}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Country</Label>
                          <Select onValueChange={(val) => studentForm.setValue("country", val)}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {COUNTRIES.map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {studentForm.formState.errors.country && (
                            <p className="text-xs text-red-400">{studentForm.formState.errors.country.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">City</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="text"
                              placeholder="Karachi"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...studentForm.register("city")}
                            />
                          </div>
                          {studentForm.formState.errors.city && (
                            <p className="text-xs text-red-400">{studentForm.formState.errors.city.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Learning Interests</Label>
                        <div className="flex flex-wrap gap-2">
                          {LEARNING_CATEGORIES.map((cat) => {
                            const selected = studentForm.watch("learningInterests")?.includes(cat);
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  const current = studentForm.getValues("learningInterests") || [];
                                  if (selected) {
                                    studentForm.setValue("learningInterests", current.filter(c => c !== cat));
                                  } else {
                                    studentForm.setValue("learningInterests", [...current, cat]);
                                  }
                                }}
                                className={cn(
                                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                                  selected
                                    ? "bg-[#f5c21a] text-[#0c1422]"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                )}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                        {studentForm.formState.errors.learningInterests && (
                          <p className="text-xs text-red-400">{studentForm.formState.errors.learningInterests.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Preferred Language</Label>
                        <Select onValueChange={(val) => studentForm.setValue("preferredLanguage", val)}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGES.map((lang) => (
                              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {studentForm.formState.errors.preferredLanguage && (
                          <p className="text-xs text-red-400">{studentForm.formState.errors.preferredLanguage.message}</p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Min 8 characters"
                              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...studentForm.register("password")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {studentForm.formState.errors.password && (
                            <p className="text-xs text-red-400">{studentForm.formState.errors.password.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...studentForm.register("confirmPassword")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {studentForm.formState.errors.confirmPassword && (
                            <p className="text-xs text-red-400">{studentForm.formState.errors.confirmPassword.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="student-terms"
                          checked={studentForm.watch("acceptTerms")}
                          onCheckedChange={(checked) => studentForm.setValue("acceptTerms", checked === true)}
                          className="border-white/30 data-[state=checked]:bg-[#f5c21a] data-[state=checked]:border-[#f5c21a]"
                        />
                        <Label htmlFor="student-terms" className="text-sm font-normal text-[#d0d4dc]">
                          I accept the <span className="text-[#f5c21a]">Terms of Service</span> and <span className="text-[#f5c21a]">Privacy Policy</span>
                        </Label>
                      </div>
                      {studentForm.formState.errors.acceptTerms && (
                        <p className="text-xs text-red-400">{studentForm.formState.errors.acceptTerms.message}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#f5c21a] text-[#0c1422] hover:bg-[#ffcf33] h-11"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          "Register as Student"
                        )}
                      </Button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-[#142033] px-2 text-[#d0d4dc]">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleGoogleAuth("register")}
                        className="w-full h-11 border-white/20 text-white hover:bg-white/10"
                      >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </Button>
                    </form>
                  </motion.div>
                )}

                {/* Instructor Registration Form */}
                {selectedRole === "instructor" && (
                  <motion.div
                    key="instructor-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#f5c21a]" />
                        <span className="font-semibold text-white">Instructor Registration</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedRole(null)}
                        className="text-xs text-[#d0d4dc] hover:text-[#f5c21a]"
                      >
                        Change Role
                      </button>
                    </div>

                    {error && (
                      <div className="mb-4 rounded-lg bg-red-900/30 p-3 text-sm text-red-300">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="mb-4 rounded-lg bg-emerald-900/30 p-3 text-sm text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        {success}
                      </div>
                    )}

                    <form onSubmit={instructorForm.handleSubmit(handleInstructorRegister)} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="text"
                              placeholder="John Doe"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("fullName")}
                            />
                          </div>
                          {instructorForm.formState.errors.fullName && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.fullName.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Professional Display Name</Label>
                          <Input
                            type="text"
                            placeholder="Sir John"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                            {...instructorForm.register("displayName")}
                          />
                          {instructorForm.formState.errors.displayName && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.displayName.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Username</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                            <Input
                              type="text"
                              placeholder="johndoe"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("username")}
                            />
                          </div>
                          {instructorForm.formState.errors.username && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.username.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("email")}
                            />
                          </div>
                          {instructorForm.formState.errors.email && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="tel"
                              placeholder="+92 300 1234567"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("phone")}
                            />
                          </div>
                          {instructorForm.formState.errors.phone && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.phone.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Years of Experience</Label>
                          <Select onValueChange={(val) => instructorForm.setValue("yearsOfExperience", val)}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((n) => (
                                <SelectItem key={n} value={n.toString()}>
                                  {n}+ {n === 1 ? "Year" : "Years"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {instructorForm.formState.errors.yearsOfExperience && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.yearsOfExperience.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Country</Label>
                          <Select onValueChange={(val) => instructorForm.setValue("country", val)}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {COUNTRIES.map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {instructorForm.formState.errors.country && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.country.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">City</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="text"
                              placeholder="Karachi"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("city")}
                            />
                          </div>
                          {instructorForm.formState.errors.city && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.city.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Professional Headline</Label>
                        <Input
                          type="text"
                          placeholder="Web Developer, Quran Teacher, English Tutor"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                          {...instructorForm.register("headline")}
                        />
                        {instructorForm.formState.errors.headline && (
                          <p className="text-xs text-red-400">{instructorForm.formState.errors.headline.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Teaching Categories / Subjects</Label>
                        <div className="flex flex-wrap gap-2">
                          {TEACHING_CATEGORIES.map((cat) => {
                            const selected = instructorForm.watch("teachingCategories")?.includes(cat);
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  const current = instructorForm.getValues("teachingCategories") || [];
                                  if (selected) {
                                    instructorForm.setValue("teachingCategories", current.filter(c => c !== cat));
                                  } else {
                                    instructorForm.setValue("teachingCategories", [...current, cat]);
                                  }
                                }}
                                className={cn(
                                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                                  selected
                                    ? "bg-[#f5c21a] text-[#0c1422]"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                )}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                        {instructorForm.formState.errors.teachingCategories && (
                          <p className="text-xs text-red-400">{instructorForm.formState.errors.teachingCategories.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Languages Spoken</Label>
                        <div className="flex flex-wrap gap-2">
                          {LANGUAGES.map((lang) => {
                            const selected = instructorForm.watch("languagesSpoken")?.includes(lang);
                            return (
                              <button
                                key={lang}
                                type="button"
                                onClick={() => {
                                  const current = instructorForm.getValues("languagesSpoken") || [];
                                  if (selected) {
                                    instructorForm.setValue("languagesSpoken", current.filter(l => l !== lang));
                                  } else {
                                    instructorForm.setValue("languagesSpoken", [...current, lang]);
                                  }
                                }}
                                className={cn(
                                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                                  selected
                                    ? "bg-[#f5c21a] text-[#0c1422]"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                )}
                              >
                                {lang}
                              </button>
                            );
                          })}
                        </div>
                        {instructorForm.formState.errors.languagesSpoken && (
                          <p className="text-xs text-red-400">{instructorForm.formState.errors.languagesSpoken.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Short Bio / Introduction (Optional)</Label>
                        <textarea
                          placeholder="Tell students about yourself, your teaching style, and what makes you unique..."
                          className="min-h-[80px] w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f5c21a]"
                          {...instructorForm.register("bio")}
                        />
                        {instructorForm.formState.errors.bio && (
                          <p className="text-xs text-red-400">{instructorForm.formState.errors.bio.message}</p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">LinkedIn Profile (Optional)</Label>
                          <div className="relative">
                            <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="url"
                              placeholder="https://linkedin.com/in/..."
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("linkedinUrl")}
                            />
                          </div>
                          {instructorForm.formState.errors.linkedinUrl && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.linkedinUrl.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Personal Website (Optional)</Label>
                          <div className="relative">
                            <GlobeIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type="url"
                              placeholder="https://yourwebsite.com"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("websiteUrl")}
                            />
                          </div>
                          {instructorForm.formState.errors.websiteUrl && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.websiteUrl.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-white">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Min 8 characters"
                              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("password")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {instructorForm.formState.errors.password && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.password.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                              {...instructorForm.register("confirmPassword")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {instructorForm.formState.errors.confirmPassword && (
                            <p className="text-xs text-red-400">{instructorForm.formState.errors.confirmPassword.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="instructor-terms"
                          checked={instructorForm.watch("acceptTerms")}
                          onCheckedChange={(checked) => instructorForm.setValue("acceptTerms", checked === true)}
                          className="border-white/30 data-[state=checked]:bg-[#f5c21a] data-[state=checked]:border-[#f5c21a]"
                        />
                        <Label htmlFor="instructor-terms" className="text-sm font-normal text-[#d0d4dc]">
                          I accept the <span className="text-[#f5c21a]">Terms of Service</span> and <span className="text-[#f5c21a]">Privacy Policy</span>
                        </Label>
                      </div>
                      {instructorForm.formState.errors.acceptTerms && (
                        <p className="text-xs text-red-400">{instructorForm.formState.errors.acceptTerms.message}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#f5c21a] text-[#0c1422] hover:bg-[#ffcf33] h-11"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          "Register as Instructor"
                        )}
                      </Button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-[#142033] px-2 text-[#d0d4dc]">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleGoogleAuth("register")}
                        className="w-full h-11 border-white/20 text-white hover:bg-white/10"
                      >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
