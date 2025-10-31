import { motion } from "framer-motion";
import client1 from "../assets/client1.png"; // replace with client logos
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";

const clients = [client1, client2, client3, client4];

export default function Clients() {
  return (
    <section id="clients" className="bg-slate-50 py-20 scroll-mt-28">
      <div className="container-px mx-auto max-w-7xl">
        {/* Heading */}
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-slate-800 sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Clients
        </motion.h2>

        <div className="grid grid-cols-2 items-center justify-center gap-8 sm:grid-cols-4">
          {clients.map((logo, i) => (
            <motion.div
              key={i}
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={logo} alt={`Client ${i + 1}`} className="h-16 object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
