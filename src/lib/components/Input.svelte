<script>
    /**
     * @typedef {Object} Props
     * @property {string} [id]
     * @property {string} [name]
     * @property {string} [type]
     * @property {string} [value]
     * @property {string} [placeholder]
     * @property {string} [label]
     * @property {import('svelte').Snippet} [icon]
     * @property {string} [error]
     * @property {boolean} [required]
     * @property {string} [class]
     * @property {(e: Event) => void} [oninput]
     */

    /** @type {Props} */
    let { 
        id, 
        name, 
        type = 'text', 
        value = $bindable(), 
        placeholder = '', 
        label, 
        icon, 
        error, 
        required = false,
        class: className = '',
        oninput,
        ...rest
    } = $props();

    const inputBaseStyles = 'w-full pr-4 py-4 border outline-none transition-all font-medium';
    const normalStyles = 'bg-gray-50 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 text-gray-700';
    const errorStyles = 'border-red-300 ring-4 ring-red-500/5 text-gray-700';
    const searchStyles = 'bg-gray-50/50 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 text-gray-600 placeholder:text-gray-400';

    let inputStyles = $derived(
        `${inputBaseStyles} ${type === 'search' ? searchStyles : normalStyles} ${error ? errorStyles : ''} ${icon ? 'pl-12' : 'pl-4'} ${className}`
    );
</script>

<div class="space-y-2">
    {#if label}
        <label for={id} class="text-sm font-bold text-gray-700 ml-1">{label}</label>
    {/if}
    <div class="relative group">
        {#if icon}
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                {@render icon()}
            </div>
        {/if}
        <input 
            {id}
            {name}
            {type}
            bind:value={value}
            {placeholder}
            {required}
            class={inputStyles}
            {oninput}
            {...rest}
        />
    </div>
    {#if error}
        <p class="text-xs text-red-500 font-bold ml-1">{error}</p>
    {/if}
</div>
