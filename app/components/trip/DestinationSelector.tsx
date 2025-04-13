"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
}

interface DestinationSelectorProps {
  destinations: Destination[];
  selectedDestinationId: string;
  onSelect: (destinationId: string) => void;
}

const DestinationSelector = ({
  destinations,
  selectedDestinationId,
  onSelect
}: DestinationSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Where would you like to go?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            isSelected={selectedDestinationId === destination.id}
            onSelect={() => onSelect(destination.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onSelect: () => void;
}

const DestinationCard = ({ destination, isSelected, onSelect }: DestinationCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onSelect}
      className="cursor-pointer"
    >
      <Card
        variant={isSelected ? "elevated" : "bordered"}
        padding="none"
        className={`overflow-hidden transition-all ${
          isSelected ? "ring-2 ring-[#ff5f1f]" : "hover:border-[#ff5f1f]"
        }`}
      >
        <div className="relative h-32">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          {isSelected && (
            <div className="absolute top-2 right-2 bg-[#ff5f1f] text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900">{destination.name}</h4>
          <p className="text-sm text-gray-600">{destination.country}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DestinationSelector;
