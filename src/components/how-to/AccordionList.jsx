import { useEffect, useState, createContext, useContext } from "react";
import { ChevronDown } from "lucide-react"; 

const AccordianContext = createContext();

export default function Accordian({ children, value, onChange, ...props }) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]); 
  return (
    <ul {...props}>
      <AccordianContext.Provider value={{ selected, setSelected }}>
        {children}
      </AccordianContext.Provider>
    </ul>
  );
}

export function AccordianItem({ children, value, trigger, ...props }) {
  const { selected, setSelected } = useContext(AccordianContext);
  const open = selected === value; 
  
  return(
    <li className="border-b" {...props}>
      <header
        role="button"
        onClick={() => setSelected(open ? null : value)} 
        className="flex items-center justify-between p-4 font-medium"
      >
        {trigger}
        <ChevronDown size={16} />
      </header>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "100vh" : 0 }}>
        {children} 
      </div>
    </li>
  );
}

export function AccordionList({sectionRef}) {
  const items = [
    { value: "item1", trigger: "What is an IP address?", content: "An IP address is a unique set of numbers that identifies a device on the internet or a local network. It works like a home address, helping data find the right destination. Every device connected to the internet has an IP address, allowing it to send and receive information." },
    { value: "item2", trigger: "What is the importance of an IP address tracker?", content: "An IP address tracker helps identify the location and network details of a given IP or domain, providing useful insights such as country, city, ISP, and timezone. It is important for security, fraud prevention, and website analytics, helping businesses detect suspicious activity and improve user experiences. Your IP tracker specifically provides detailed information about an IP, including its geographical location, internet service provider, and DNS details. This can be useful for troubleshooting network issues, verifying users, or enhancing online services." },
    { value: "item3", trigger: "How often do you update your database?", content: "Our database is kept updated in real time whenever new IP information becomes available. This means every time you look up an IP, you’ll get the most accurate location data without needing to update anything yourself." },
  ];

  return (
    <div className="bg-white"  ref={sectionRef}>
      <div className="w-full max-w-6xl p-10 mx-auto">
        <div className="text-3xl text-center font-QuicksandLight">
          <h3>Frequently Asked Questions</h3>
        </div>
        <div className="">
          <Accordian value={null}>
          {items.map(({ value, trigger, content }) => (
            <AccordianItem key={value} value={value} trigger={trigger}>
              <div className="p-4">{content}</div>
            </AccordianItem>
          ))}
          </Accordian> 
        </div>
      </div>
    </div> 
  );
}