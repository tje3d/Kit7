<script>
    import { Users, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-svelte';
    import Button from '$lib/components/Button.svelte';
</script>

<div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
    <!-- Abstract Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
    </div>

    <main class="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8 animate-fade-in">
            <ShieldCheck size={16} />
            <span>Enterprise User Management System</span>
        </div>

        <!-- Hero Content -->
        <h1 class="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Manage your team <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                with total confidence.
            </span>
        </h1>
        
        <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The modern workspace for scaling teams. Streamline user onboarding, 
            permissions, and team collaboration in one unified dashboard.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
                href="/users" 
                size="xl"
                class="group"
            >
                Launch Dashboard
                <ArrowRight size={20} class="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
                variant="secondary"
                size="xl"
                class="bg-white"
            >
                View Features
            </Button>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div class="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <Users size={24} />
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Team Collaboration</h3>
                <p class="text-gray-500">Easily manage multiple teams and departments from a single view.</p>
            </div>
            
            <div class="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Real-time Updates</h3>
                <p class="text-gray-500">Changes reflect instantly across all sessions with low-latency syncing.</p>
            </div>

            <div class="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Global Access</h3>
                <p class="text-gray-500">Access your management console from anywhere, on any device.</p>
            </div>
        </div>
    </main>

    <!-- Bottom Gradient Blur -->
    <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent -z-10"></div>
</div>


