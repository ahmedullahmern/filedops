// import React from 'react';

// const HomeComp = () => {
//     return (
//         <div className="min-h-screen bg-slate-50 font-['Inter'] antialiased">
//             {/* Navigation */}
//             <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center h-16">
//                         <div className="flex items-center gap-2">
//                             <div className="w-8 h-8 bg-[#0052CC] rounded flex items-center justify-center">
//                                 <span className="text-white font-bold text-lg">F</span>
//                             </div>
//                             <span className="text-xl font-bold text-[#0052CC] tracking-tight">FieldOps</span>
//                         </div>
//                         <div className="hidden md:flex items-center space-x-8">
//                             <a href="#features" className="text-slate-600 hover:text-[#0052CC] font-medium transition-colors">Features</a>
//                             <a href="#solutions" className="text-slate-600 hover:text-[#0052CC] font-medium transition-colors">Solutions</a>
//                             <a href="#pricing" className="text-slate-600 hover:text-[#0052CC] font-medium transition-colors">Pricing</a>
//                             <button className="bg-[#0052CC] hover:bg-[#0041a3] text-white px-5 py-2 rounded-lg font-bold transition-all active:scale-95">
//                                 Contact Sales
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {/* Hero Section */}
//             <header className="relative bg-white pt-20 pb-32 overflow-hidden">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                     <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
//                         <div>
//                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-6">
//                                 Field Management Excellence
//                             </div>
//                             <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
//                                 Empowering the world's most efficient field teams.
//                             </h1>
//                             <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
//                                 The all-in-one platform to schedule jobs, track technicians in real-time, and deliver exceptional service that keeps your customers coming back.
//                             </p>
//                             <div className="flex flex-col sm:flex-row gap-4">
//                                 <button className="bg-[#0052CC] hover:bg-[#0041a3] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95">
//                                     Get Started
//                                 </button>
//                                 <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
//                                     <svg className="w-5 h-5 text-[#0052CC]" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                                     </svg>
//                                     Watch Demo
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="mt-12 lg:mt-0 relative">
//                             <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
//                                 <img
//                                     src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
//                                     alt="Technician using FieldOps"
//                                     className="w-full h-full object-cover"
//                                 />
//                                 <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-4">
//                                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                                         <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                                     </div>
//                                     <div>
//                                         <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Jobs</p>
//                                         <p className="text-xl font-black text-slate-900">1,284 Managed</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             {/* Features Section */}
//             <section id="features" className="py-24 bg-slate-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
//                     <h2 className="text-3xl font-bold text-slate-900 mb-4">Precision Engineering for Every Workflow</h2>
//                     <p className="text-slate-600 max-w-2xl mx-auto">Tools built to handle the complexities of modern field operations, from dispatch to final sign-off.</p>
//                 </div>
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {[
//                         { title: "Job Management", desc: "Centralize all your work orders. From complex multi-day projects to quick maintenance calls.", icon: "assignment" },
//                         { title: "Real-time Tracking", desc: "Live GPS visibility of your entire fleet. Optimizing routes on the fly and provide accurate ETAs.", icon: "location_on" },
//                         { title: "Automated Scheduling", desc: "Smart dispatching engine that matches the right technician with the right skill set to the job.", icon: "event" }
//                     ].map((feature, i) => (
//                         <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0052CC] mb-6">
//                                 <span className="material-icons-outlined">{feature.icon}</span>
//                             </div>
//                             <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
//                             <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Social Proof */}
//             <section className="py-24 bg-white">
//                 <div className="max-w-5xl mx-auto px-4 text-center">
//                     <div className="flex justify-center gap-1 text-yellow-400 mb-8">
//                         {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-icons">star</span>)}
//                     </div>
//                     <blockquote className="text-3xl font-medium text-slate-900 italic leading-snug mb-10">
//                         "FieldOps transformed our dispatch process. We've seen a 30% increase in technician productivity and a significant boost in customer satisfaction scores within the first three months."
//                     </blockquote>
//                     <div className="flex items-center justify-center gap-4">
//                         <img src="https://i.pravatar.cc/100?img=12" alt="Testimonial" className="w-12 h-12 rounded-full border-2 border-slate-100" />
//                         <div className="text-left">
//                             <p className="font-bold text-slate-900">Michael Rodriguez</p>
//                             <p className="text-sm text-slate-500">Director of Operations, Metro Utilities</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section className="py-24 px-4">
//                 <div className="max-w-5xl mx-auto bg-[#0052CC] rounded-[40px] p-12 text-center text-white relative overflow-hidden">
//                     <div className="relative z-10">
//                         <h2 className="text-4xl font-bold mb-6">Ready to transform your field operations?</h2>
//                         <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">Join thousands of companies using FieldOps to scale their service delivery and delight their customers.</p>
//                         <div className="flex flex-col sm:flex-row justify-center gap-4">
//                             <button className="bg-white text-[#0052CC] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">Contact Sales</button>
//                             <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">View Pricing</button>
//                         </div>
//                     </div>
//                     {/* Abstract pattern */}
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
//                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-800/40 rounded-full blur-3xl -ml-32 -mb-32"></div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="py-12 border-t border-slate-200">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
//                     <div className="flex items-center gap-2">
//                         <div className="w-6 h-6 bg-[#0052CC] rounded flex items-center justify-center">
//                             <span className="text-white font-bold text-xs">F</span>
//                         </div>
//                         <span className="font-bold text-slate-900">FieldOps</span>
//                     </div>
//                     <p className="text-slate-400 text-sm">© 2024 FieldOps Inc. All rights reserved.</p>
//                     <div className="flex gap-8 text-sm font-medium text-slate-500">
//                         <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
//                         <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
//                         <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default HomeComp;






import React from 'react';

/**





FieldOps Premium Landing Page



Exact match for the visual design in SCREEN_4
 */
const HomeComp = () => {
    return (
        <div className="px-10 py-6">

            {/* Navbar */}
            <div className="flex justify-between items-center">
                <div className="hidden md:flex items-center gap-10">
                    <a href="#" className="text-sm font-semibold text-[#0052CC] border-b-2 border-[#0052CC] pb-1">Features</a>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-900">Solutions</a>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-900">Pricing</a>
                </div>

                <button className="bg-[#0052CC] text-white px-6 py-2.5 rounded-lg">
                    Contact Sales
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative mt-16">
                <img
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837"
                    className="w-full h-[500px] object-cover rounded-3xl"
                />

                <div className="absolute bottom-8 left-8 bg-white p-5 rounded-xl shadow">
                    <p className="text-sm text-gray-400">Active Jobs</p>
                    <p className="text-xl font-bold">1,284 Managed</p>
                </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
                <div className="bg-gray-100 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold">Job Management</h3>
                </div>

                <div className="bg-gray-100 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold">Real-time Tracking</h3>
                </div>

                <div className="bg-gray-100 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold">Automated Scheduling</h3>
                </div>
            </div>

            {/* Stars */}
            <div className="mt-10">
                {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-16 border-t pt-6">
                <p>© 2024 FieldOps Inc.</p>
            </div>

        </div>
    );
};

export default HomeComp