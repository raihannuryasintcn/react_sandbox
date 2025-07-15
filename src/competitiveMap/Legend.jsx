
function Legend({providers}) {
    return (
        <div style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "8px",
            border: "2px solid #ccc",
            zIndex: 1000,
            fontSize: "14px"
        }}
        className="flex flex-col gap-0.5">

            {providers.map((p) => (
                <div key={p.name} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 bg-${p.color}`} />
                    <span>{p.name}</span>
                </div>
            ))}
        </div>
    );
}

export default Legend