// Legend.jsx
const ispColors = [
    { name: "ICONNET", color: "emerald-600" },
    { name: "First Media", color: "orange-300" },
    { name: "Biznet Home", color: "violet-400" },
    { name: "MyRepublic", color: "zinc-400" },
    { name: "XL Satu", color: "amber-200" },
    { name: "MNC Play", color: "red-300" },
    { name: "Indosat Hifi", color: "blue-300" },
    { name: "Oxygen.id", color: "indigo-300" },
    { name: "CBN Fiber", color: "fuschia-300" }
  ];
  
  function Legend() {
    return (
      <div style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 0 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
        fontSize: "14px"
      }}>
        
        {ispColors.map((isp) => (
          <div key={isp.name} style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <div className={`w-3 h-3 rounded-full mr-2 ${isp.color}`} />
            <span>{isp.name}</span>
          </div>
        ))}
      </div>
    );
  }
  
  export default Legend;
  