import React from "react";
import CustomerNavigation from "@/components/CustomerNavigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductCategories from "@/components/ProductCategories";
import HowItWorks from "@/components/HowItWorks";

interface CustomerHomeProps {
  onSwitchInterface?: () => void;
}

const CustomerHome = ({ onSwitchInterface }: CustomerHomeProps) => {
  return (
    <>
      <CustomerNavigation onSwitchInterface={onSwitchInterface ?? (() => {})} />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Hero />
        <Features />
        <ProductCategories />
        <HowItWorks />
      </main>
    </>
  );
};

export default CustomerHome;
