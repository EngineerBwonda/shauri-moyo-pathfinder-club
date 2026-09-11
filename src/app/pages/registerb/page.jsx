"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { createClient } from "@/utils/supabase/client";
import { createClient } from "../../utils/supabase/client";

//======================================================================================================

// import { supabase } from '../lib/supabaseClient'

// import { useRouter } from "next/navigation";
// import { createClient } from "../../utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            age: formData.age,
            gender: formData.gender,
            location: formData.location.trim(),
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (!authData.user) {
        setError("Unable to create account. Please try again.");
        return;
      }

      const { error: memberError } = await supabase.from("members").insert({
        id: authData.user.id,
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        location: formData.location.trim(),
        approved: false,
      });

      if (memberError) {
        console.error(memberError);
        setError(
          "Your account was created, but access could not be set up. Please contact support.",
        );
        return;
      }

      setSuccess("Your account has been created and is awaiting approval.");
      router.push("../../pages/pending");
    } catch (error) {
      console.error(error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-light min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            {/* Registration Card */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <div
                    className="bg-dark text-white rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    A
                  </div>

                  <h2 className="fw-bold mb-2">Create an account</h2>

                  <p className="text-muted mb-0">
                    Register to access the system
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {/* Success */}
                {success && (
                  <div className="alert alert-success" role="alert">
                    <strong>Registration successful!</strong>
                    <br />
                    {success}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label
                      htmlFor="fullName"
                      className="form-label fw-semibold"
                    >
                      Full name
                    </label>

                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="form-control form-control-lg"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email address
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Age */}
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label fw-semibold">
                      Age
                    </label>

                    <input
                      type="number"
                      id="age"
                      name="age"
                      className="form-control form-control-lg"
                      placeholder="e.g. 28"
                      min="0"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label fw-semibold">
                      Gender
                    </label>

                    <select
                      id="gender"
                      name="gender"
                      className="form-select form-select-lg"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>

                  {/* Location */}
                  <div className="mb-3">
                    <label
                      htmlFor="location"
                      className="form-label fw-semibold"
                    >
                      Location
                    </label>

                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control form-control-lg"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />

                    <div className="form-text">
                      Password must be at least 6 characters.
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold"
                    >
                      Confirm password
                    </label>

                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>

                {/* Login */}
                <div className="text-center mt-4">
                  <span className="text-muted">Already have an account? </span>

                  <a
                    href="/login"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-muted small mt-4">
              © 2026 Admin System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

//======================================================================================================

// export default function RegisterPage() {
//   const router = useRouter();
//   const supabase = createClient();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     age: "",
//     gender: "",
//     location: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     // Validate password
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create Supabase Auth account (email + password).
//       // Extra fields are stored as user metadata — no separate profile row is created.
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//         options: {
//           data: {
//             full_name: formData.fullName,
//             age: formData.age,
//             gender: formData.gender,
//             location: formData.location,
//           },
//         },
//       });

//       if (authError) {
//         setError(authError.message);
//         return;
//       }

//       if (!authData.user) {
//         setError("Unable to create account. Please try again.");
//         return;
//       }

//       setSuccess(
//         "Your account has been created. Please check your email to confirm your address.",
//       );

//       setTimeout(() => {
//         router.push("/login");
//       }, 2000);
//     } catch (error) {
//       console.error(error);

//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="bg-light min-vh-100 d-flex align-items-center py-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//             {/* Registration Card */}
//             <div className="card border-0 shadow-sm rounded-4">
//               <div className="card-body p-4 p-md-5">
//                 {/* Logo */}
//                 <div className="text-center mb-4">
//                   <div
//                     className="bg-dark text-white rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       fontSize: "20px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     A
//                   </div>

//                   <h2 className="fw-bold mb-2">Create an account</h2>

//                   <p className="text-muted mb-0">
//                     Register to access the system
//                   </p>
//                 </div>

//                 {/* Error */}
//                 {error && (
//                   <div className="alert alert-danger" role="alert">
//                     {error}
//                   </div>
//                 )}

//                 {/* Success */}
//                 {success && (
//                   <div className="alert alert-success" role="alert">
//                     <strong>Registration successful!</strong>
//                     <br />
//                     {success}
//                   </div>
//                 )}

//                 {/* Form */}
//                 <form onSubmit={handleSubmit}>
//                   {/* Full Name */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="fullName"
//                       className="form-label fw-semibold"
//                     >
//                       Full name
//                     </label>

//                     <input
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       className="form-control form-control-lg"
//                       placeholder="John Doe"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Email */}
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label fw-semibold">
//                       Email address
//                     </label>

//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="form-control form-control-lg"
//                       placeholder="john@example.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Age */}
//                   <div className="mb-3">
//                     <label htmlFor="age" className="form-label fw-semibold">
//                       Age
//                     </label>

//                     <input
//                       type="number"
//                       id="age"
//                       name="age"
//                       className="form-control form-control-lg"
//                       placeholder="e.g. 28"
//                       min="0"
//                       value={formData.age}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Gender */}
//                   <div className="mb-3">
//                     <label htmlFor="gender" className="form-label fw-semibold">
//                       Gender
//                     </label>

//                     <select
//                       id="gender"
//                       name="gender"
//                       className="form-select form-select-lg"
//                       value={formData.gender}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="" disabled>
//                         Select gender
//                       </option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                       <option value="prefer_not_to_say">
//                         Prefer not to say
//                       </option>
//                     </select>
//                   </div>

//                   {/* Location */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="location"
//                       className="form-label fw-semibold"
//                     >
//                       Location
//                     </label>

//                     <input
//                       type="text"
//                       id="location"
//                       name="location"
//                       className="form-control form-control-lg"
//                       placeholder="City, Country"
//                       value={formData.location}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Password */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="password"
//                       className="form-label fw-semibold"
//                     >
//                       Password
//                     </label>

//                     <input
//                       type="password"
//                       id="password"
//                       name="password"
//                       className="form-control form-control-lg"
//                       placeholder="Create a password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       minLength={6}
//                     />

//                     <div className="form-text">
//                       Password must be at least 6 characters.
//                     </div>
//                   </div>

//                   {/* Confirm Password */}
//                   <div className="mb-4">
//                     <label
//                       htmlFor="confirmPassword"
//                       className="form-label fw-semibold"
//                     >
//                       Confirm password
//                     </label>

//                     <input
//                       type="password"
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       className="form-control form-control-lg"
//                       placeholder="Confirm your password"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     className="btn btn-dark btn-lg w-100"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span
//                           className="spinner-border spinner-border-sm me-2"
//                           role="status"
//                           aria-hidden="true"
//                         />
//                         Creating account...
//                       </>
//                     ) : (
//                       "Create account"
//                     )}
//                   </button>
//                 </form>

//                 {/* Login */}
//                 <div className="text-center mt-4">
//                   <span className="text-muted">Already have an account? </span>
//                   {/*
//                     href="/login"
//                     className="text-dark fw-semibold text-decoration-none" */}
//                   {/* > */}
//                   Sign in
//                   {/* </a> */}
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <p className="text-center text-muted small mt-4">
//               © 2026 Admin System. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// // import { createClient } from "@/utils/supabase/client";
// import { createClient } from "../../utils/supabase/client";
// export default function RegisterPage() {
//   const router = useRouter();
//   const supabase = createClient();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     // Validate password
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1. Create Supabase Auth account
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//       });

//       if (authError) {
//         setError(authError.message);
//         return;
//       }

//       if (!authData.user) {
//         setError("Unable to create account. Please try again.");
//         return;
//       }

//       // 2. Create profile
//       const { error: profileError } = await supabase.from("profiles").insert({
//         id: authData.user.id,
//         full_name: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         status: "pending",
//       });

//       if (profileError) {
//         console.error(profileError);

//         setError(
//           "Your account was created, but we could not create your profile. Please contact support.",
//         );

//         return;
//       }

//       // 3. Show success message
//       setSuccess(
//         "Registration successful! Your account is now awaiting administrator approval.",
//       );

//       // 4. Redirect to pending page
//       setTimeout(() => {
//         router.push("/pending");
//       }, 2000);
//     } catch (error) {
//       console.error(error);

//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="bg-light min-vh-100 d-flex align-items-center py-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//             {/* Registration Card */}
//             <div className="card border-0 shadow-sm rounded-4">
//               <div className="card-body p-4 p-md-5">
//                 {/* Logo */}
//                 <div className="text-center mb-4">
//                   <div
//                     className="bg-dark text-white rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       fontSize: "20px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     A
//                   </div>

//                   <h2 className="fw-bold mb-2">Create an account</h2>

//                   <p className="text-muted mb-0">
//                     Register to access the system
//                   </p>
//                 </div>

//                 {/* Error */}
//                 {error && (
//                   <div className="alert alert-danger" role="alert">
//                     {error}
//                   </div>
//                 )}

//                 {/* Success */}
//                 {success && (
//                   <div className="alert alert-success" role="alert">
//                     <strong>Registration successful!</strong>
//                     <br />
//                     {success}
//                   </div>
//                 )}

//                 {/* Form */}
//                 <form onSubmit={handleSubmit}>
//                   {/* Full Name */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="fullName"
//                       className="form-label fw-semibold"
//                     >
//                       Full name
//                     </label>

//                     <input
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       className="form-control form-control-lg"
//                       placeholder="John Doe"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Email */}
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label fw-semibold">
//                       Email address
//                     </label>

//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="form-control form-control-lg"
//                       placeholder="john@example.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Phone */}
//                   <div className="mb-3">
//                     <label htmlFor="phone" className="form-label fw-semibold">
//                       Phone number
//                     </label>

//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       className="form-control form-control-lg"
//                       placeholder="+254 712 345 678"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Password */}
//                   <div className="mb-3">
//                     <label
//                       htmlFor="password"
//                       className="form-label fw-semibold"
//                     >
//                       Password
//                     </label>

//                     <input
//                       type="password"
//                       id="password"
//                       name="password"
//                       className="form-control form-control-lg"
//                       placeholder="Create a password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       minLength={6}
//                     />

//                     <div className="form-text">
//                       Password must be at least 6 characters.
//                     </div>
//                   </div>

//                   {/* Confirm Password */}
//                   <div className="mb-4">
//                     <label
//                       htmlFor="confirmPassword"
//                       className="form-label fw-semibold"
//                     >
//                       Confirm password
//                     </label>

//                     <input
//                       type="password"
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       className="form-control form-control-lg"
//                       placeholder="Confirm your password"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Approval Notice */}
//                   <div className="alert alert-light border mb-4">
//                     <div className="d-flex">
//                       <div className="me-3">
//                         <span
//                           className="badge rounded-circle bg-dark p-2"
//                           style={{
//                             width: "32px",
//                             height: "32px",
//                           }}
//                         >
//                           ✓
//                         </span>
//                       </div>

//                       <div>
//                         <h6 className="fw-bold mb-1">
//                           Administrator approval required
//                         </h6>

//                         <p className="text-muted small mb-0">
//                           After registration, your account will be reviewed by
//                           an administrator. You will be able to access the
//                           system once your account has been approved.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     className="btn btn-dark btn-lg w-100"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span
//                           className="spinner-border spinner-border-sm me-2"
//                           role="status"
//                           aria-hidden="true"
//                         />
//                         Creating account...
//                       </>
//                     ) : (
//                       "Create account"
//                     )}
//                   </button>
//                 </form>

//                 {/* Login */}
//                 <div className="text-center mt-4">
//                   <span className="text-muted">Already have an account? </span>

//                   <a
//                     href="/login"
//                     className="text-dark fw-semibold text-decoration-none"
//                   >
//                     Sign in
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <p className="text-center text-muted small mt-4">
//               © 2026 Admin System. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
