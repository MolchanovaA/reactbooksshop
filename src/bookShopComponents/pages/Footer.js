import React from "react";

export default function Footer() {
  return (
    <footer>
      <section className="footerInfo">
        <a href="#" rel="noopener noreferrer" title="delivery">
          Delivery
        </a>
        <a href="#" rel="noopener noreferrer" title="contacts">
          Contacts
        </a>
        <a href="" rel="noopener noreferrer" title="our shops">
          Offline stores
        </a>
      </section>
      <p className="prometheusLink">
        <a href="https://prometheus.org.ua/" rel="noopener noreferrer">
          Виконано в Prometheus © 2022
        </a>
      </p>
    </footer>
  );
}
