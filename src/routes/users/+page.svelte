<script>
    import { enhance } from '$app/forms';
    import { 
        Plus, 
        Pencil, 
        Trash2, 
        User as UserIcon, 
        Mail, 
        X,
        Loader2,
        Search,
        ChevronLeft,
        ChevronRight,
        LayoutDashboard,
        ArrowLeft,
        Settings2,
        UserPlus2
    } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import Button from '$lib/components/Button.svelte';
    import Input from '$lib/components/Input.svelte';

    let { data, form } = $props();
    
    /** @type {typeof data.users[0] | null} */
    let editingUser = $state(null);
    let isModalOpen = $state(false);
    let searchQuery = $state(page.url.searchParams.get('search') ?? '');
    let isSubmitting = $state(false);

    function updateSearch() {
        const url = new URL(page.url);
        if (searchQuery) {
            url.searchParams.set('search', searchQuery);
        } else {
            url.searchParams.delete('search');
        }
        url.searchParams.set('page', '1');
        goto(url, { keepFocus: true, replaceState: true });
    }

    /** @param {number} p */
    function goToPage(p) {
        const url = new URL(page.url);
        url.searchParams.set('page', p.toString());
        goto(url);
    }

    $effect(() => {
        if (form?.error) {
            isModalOpen = true;
        }
    });

    function openCreateModal() {
        editingUser = null;
        isModalOpen = true;
    }

    /** @param {typeof data.users[0]} user */
    function openEditModal(user) {
        editingUser = { ...user };
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
        editingUser = null;
    }
</script>

<div class="min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
    <!-- Abstract Background -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div class="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-50/50 rounded-full blur-3xl"></div>
        <div class="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-50/50 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-6xl mx-auto">
        <!-- Top Navigation -->
        <div class="flex items-center gap-4 mb-10">
            <Button 
                href="/" 
                variant="ghost"
                title="Back to Home"
            >
                <ArrowLeft size={20} />
            </Button>
            <div class="h-6 w-px bg-gray-200"></div>
            <div class="flex items-center gap-2 text-sm font-medium text-gray-500">
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
                <span class="text-gray-300">/</span>
                <span class="text-gray-900">Users Management</span>
            </div>
        </div>

        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div class="space-y-2">
                <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">
                    Team <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Members</span>
                </h1>
                <p class="text-gray-500 text-lg">Manage account permissions and roles for your organization.</p>
            </div>
            
            <div class="flex items-center gap-3">
                <Button 
                    variant="ghost"
                    title="Table Settings"
                >
                    <Settings2 size={20} />
                </Button>
                <Button 
                    onclick={openCreateModal}
                    class="px-6 py-3"
                >
                    <UserPlus2 size={20} />
                    Add Member
                </Button>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="space-y-6">
            <!-- Search and Stats Bar -->
            <div class="flex flex-col lg:flex-row gap-4">
                <div class="flex-1 relative group">
                    <Input 
                        type="search" 
                        bind:value={searchQuery}
                        oninput={updateSearch}
                        placeholder="Search by name, email, or role..." 
                    >
                        {#snippet icon()}
                            <Search size={20} />
                        {/snippet}
                    </Input>
                </div>
                
                <div class="flex items-center gap-4 px-6 py-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                    <div class="flex -space-x-2">
                        {#each data.users.slice(0, 3) as user}
                            <div class="w-8 h-8 rounded-full border-2 border-white bg-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700 uppercase">
                                {user.name?.charAt(0) || user.email.charAt(0)}
                            </div>
                        {/each}
                    </div>
                    <div class="text-sm">
                        <span class="font-bold text-indigo-900">{data.pagination.total}</span>
                        <span class="text-indigo-600/70 font-medium"> Total Members</span>
                    </div>
                </div>
            </div>

            <!-- Table Container -->
            <div class="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50/50 border-b border-gray-100">
                                <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">Member Detail</th>
                                <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">Status</th>
                                <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-[0.1em] text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            {#each data.users as user (user.id)}
                                <tr class="hover:bg-indigo-50/30 transition-colors group">
                                    <td class="px-8 py-5">
                                        <div class="flex items-center gap-4">
                                            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-100">
                                                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div class="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{user.name || 'No Name'}</div>
                                                <div class="flex items-center gap-1.5 text-gray-400 text-sm font-medium">
                                                    <Mail size={12} />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-8 py-5">
                                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                                            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            Active
                                        </span>
                                    </td>
                                    <td class="px-8 py-5 text-right">
                                        <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <Button 
                                                variant="icon"
                                                onclick={() => openEditModal(user)}
                                                title="Edit Member"
                                            >
                                                <Pencil size={18} />
                                            </Button>
                                            <form 
                                                method="POST" 
                                                action="?/delete" 
                                                use:enhance={() => {
                                                    isSubmitting = true;
                                                    return async ({ result, update }) => {
                                                        isSubmitting = false;
                                                        if (result.type === 'success') {
                                                            closeModal();
                                                        }
                                                        await update();
                                                    };
                                                }}
                                                class="inline"
                                            >
                                                <input type="hidden" name="id" value={user.id} />
                                                <Button 
                                                    type="submit"
                                                    variant="danger"
                                                    title="Remove Member"
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            {:else}
                                <tr>
                                    <td colspan="3" class="px-8 py-20 text-center">
                                        <div class="flex flex-col items-center gap-4 max-w-xs mx-auto">
                                            <div class="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-200">
                                                <UserIcon size={40} />
                                            </div>
                                            <div class="space-y-1">
                                                <h3 class="text-lg font-bold text-gray-900">No members found</h3>
                                                <p class="text-gray-500 text-sm">We couldn't find any team members matching your current search criteria.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                {#if data.pagination.totalPages > 1}
                    <div class="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="text-sm font-medium text-gray-500">
                            Displaying <span class="text-gray-900">{(data.pagination.page - 1) * data.pagination.limit + 1}-{Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)}</span> of <span class="text-gray-900">{data.pagination.total}</span> members
                        </div>
                        <div class="flex items-center gap-1.5">
                            <Button 
                                variant="icon"
                                disabled={data.pagination.page === 1}
                                onclick={() => goToPage(data.pagination.page - 1)}
                            >
                                <ChevronLeft size={20} />
                            </Button>
                            
                            <div class="flex items-center gap-1">
                                {#each Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1) as p}
                                    {#if p === 1 || p === data.pagination.totalPages || (p >= data.pagination.page - 1 && p <= data.pagination.page + 1)}
                                        <Button 
                                            variant={data.pagination.page === p ? 'pagination-active' : 'pagination'}
                                            onclick={() => goToPage(p)}
                                        >
                                            {p}
                                        </Button>
                                    {:else if (p === 2 && data.pagination.page > 3) || (p === data.pagination.totalPages - 1 && data.pagination.page < data.pagination.totalPages - 2)}
                                        <span class="px-2 text-gray-300">•••</span>
                                    {/if}
                                {/each}
                            </div>

                            <Button 
                                variant="icon"
                                disabled={data.pagination.page === data.pagination.totalPages}
                                onclick={() => goToPage(data.pagination.page + 1)}
                            >
                                <ChevronRight size={20} />
                            </Button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<!-- Modal Backdrop -->
{#if isModalOpen}
    <div 
        class="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-40 transition-opacity"
        onclick={closeModal}
        onkeydown={(e) => e.key === 'Escape' && closeModal()}
        role="button"
        tabindex="-1"
    ></div>

    <!-- Modal Content -->
    <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4">
        <div class="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div class="space-y-0.5">
                    <h2 class="text-2xl font-extrabold text-gray-900">
                        {editingUser ? 'Edit Member' : 'Add New Member'}
                    </h2>
                    <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">User Account Configuration</p>
                </div>
                <Button 
                    variant="ghost"
                    onclick={closeModal}
                >
                    <X size={20} />
                </Button>
            </div>

            <form 
                method="POST" 
                action={editingUser ? '?/update' : '?/create'} 
                use:enhance={() => {
                    isSubmitting = true;
                    return async ({ result, update }) => {
                        isSubmitting = false;
                        if (result.type === 'success') {
                            closeModal();
                        }
                        await update();
                    };
                }}
                class="p-8 space-y-6"
            >
                {#if editingUser}
                    <input type="hidden" name="id" value={editingUser.id} />
                {/if}

                <Input 
                    id="name"
                    name="name" 
                    label="Full Name"
                    value={form?.name ?? editingUser?.name ?? ''}
                    placeholder="e.g. Alex Johnson" 
                >
                    {#snippet icon()}
                        <UserIcon size={18} />
                    {/snippet}
                </Input>

                <Input 
                    type="email" 
                    id="email"
                    name="email" 
                    label="Email Address"
                    required
                    value={form?.email ?? editingUser?.email ?? ''}
                    placeholder="alex@company.com" 
                    error={form?.error}
                >
                    {#snippet icon()}
                        <Mail size={18} />
                    {/snippet}
                </Input>

                <div class="pt-6 flex gap-3">
                    <Button 
                        variant="secondary"
                        onclick={closeModal}
                        class="flex-1 py-4"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                        class="flex-1 py-4"
                    >
                        {#if isSubmitting}
                            <Loader2 size={20} class="animate-spin" />
                            {editingUser ? 'Updating...' : 'Creating...'}
                        {:else}
                            {editingUser ? 'Update Member' : 'Create Member'}
                        {/if}
                    </Button>
                </div>
            </form>
        </div>
    </div>
{/if}


