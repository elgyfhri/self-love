export default function SearchInput({
    value,
    onChange,
}) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search..."
            className="w-72 rounded-xl border px-4 py-3 focus:border-violet-500 focus:outline-none"
        />
    );
}