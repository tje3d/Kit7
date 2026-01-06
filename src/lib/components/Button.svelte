<script>
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     * @property {'primary' | 'secondary' | 'ghost' | 'danger' | 'icon' | 'pagination' | 'pagination-active'} [variant]
     * @property {'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-lg' | 'pagination'} [size]
     * @property {string} [class]
     * @property {boolean} [disabled]
     * @property {(e: MouseEvent) => void} [onclick]
     * @property {'button' | 'submit' | 'reset'} [type]
     * @property {string} [title]
     * @property {string} [href]
     */

    /** @type {Props} */
    let { 
        children, 
        variant = 'primary', 
        size = 'md', 
        class: className = '', 
        disabled = false,
        onclick,
        type = 'button',
        title,
        href,
        ...rest
    } = $props();

    const baseStyles = 'transition-all disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500';
    
    const variants = {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100 hover:shadow-indigo-200 flex items-center justify-center gap-2',
        secondary: 'border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 flex items-center justify-center gap-2',
        ghost: 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-200 transition-all',
        danger: 'text-gray-400 hover:text-red-600 hover:bg-white hover:shadow-md transition-all',
        icon: 'text-gray-400 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all',
        pagination: 'flex items-center justify-center font-bold text-sm text-gray-500 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-gray-200',
        'pagination-active': 'flex items-center justify-center font-bold text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-100'
    };

    const sizes = {
        sm: 'p-2 rounded-xl',
        md: 'px-6 py-3 rounded-2xl',
        lg: 'px-6 py-4 rounded-2xl',
        xl: 'px-8 py-4 rounded-2xl text-lg',
        icon: 'p-2.5 rounded-xl',
        'icon-lg': 'p-2.5 rounded-2xl',
        pagination: 'w-10 h-10 rounded-xl'
    };

    // Determine size based on variant if not explicitly provided
    let buttonSize = $derived.by(() => {
        if (variant === 'icon' || variant === 'danger') return 'icon';
        if (variant === 'pagination' || variant === 'pagination-active') return 'pagination';
        if (variant === 'ghost') return 'icon';
        return size;
    });

    const classes = $derived(`${baseStyles} ${variants[variant]} ${sizes[buttonSize]} ${className}`);
</script>

{#if href}
    <a 
        {href} 
        class={classes} 
        {title}
        {...rest}
    >
        {#if children}
            {@render children()}
        {/if}
    </a>
{:else}
    <button 
        {type} 
        class={classes} 
        {disabled} 
        {onclick} 
        {title}
        {...rest}
    >
        {#if children}
            {@render children()}
        {/if}
    </button>
{/if}
