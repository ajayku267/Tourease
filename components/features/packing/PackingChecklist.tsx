"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Check, CheckCircle, Circle, Trash2, PackagePlus, MessageSquarePlus, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the interfaces for our data structure
interface ChecklistItem {
  id: string;
  name: string;
  checked: boolean;
  category: string;
  essential: boolean;
}

interface ChecklistCategory {
  id: string;
  name: string;
  emoji: string;
}

// Default categories
const defaultCategories: ChecklistCategory[] = [
  { id: "essentials", name: "Essentials", emoji: "🔑" },
  { id: "clothing", name: "Clothing", emoji: "👕" },
  { id: "toiletries", name: "Toiletries", emoji: "🧴" },
  { id: "electronics", name: "Electronics", emoji: "📱" },
  { id: "documents", name: "Documents", emoji: "📄" },
  { id: "medical", name: "Medical", emoji: "💊" },
  { id: "misc", name: "Miscellaneous", emoji: "🔮" },
];

interface PackingChecklistProps {
  tripDestination?: string;
  tripDuration?: number;
  tripType?: string;
  climate?: string;
  className?: string;
}

export function PackingChecklist({
  tripDestination = "",
  tripDuration = 0,
  tripType = "leisure",
  climate = "mild",
  className = "",
}: PackingChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("essentials");
  const [categories, setCategories] = useState<ChecklistCategory[]>(defaultCategories);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Initialize the checklist with suggested items when the component mounts
  useEffect(() => {
    // Only initialize if we haven't already
    if (items.length === 0) {
      generateSuggestedList();
    }
  }, []);

  // Add a new item to the checklist
  const addItem = (name: string, category: string, essential: boolean = false) => {
    if (!name.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      name: name.trim(),
      checked: false,
      category,
      essential,
    };

    setItems([...items, newItem]);
    setNewItemName("");
  };

  // Toggle an item's checked status
  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Remove an item from the checklist
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Reset all checked items
  const resetChecked = () => {
    setItems(
      items.map((item) => ({
        ...item,
        checked: false,
      }))
    );
  };

  // Generate suggested packing list based on trip details
  const generateSuggestedList = () => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return false;
    
    // Basic items everyone should pack
    const suggestedItems: { name: string; category: string; essential: boolean }[] = [
      { name: "Passport/ID", category: "documents", essential: true },
      { name: "Phone Charger", category: "electronics", essential: true },
      { name: "Toothbrush", category: "toiletries", essential: true },
      { name: "Toothpaste", category: "toiletries", essential: true },
      { name: "Deodorant", category: "toiletries", essential: true },
      { name: "T-shirts", category: "clothing", essential: true },
      { name: "Underwear", category: "clothing", essential: true },
      { name: "Socks", category: "clothing", essential: true },
    ];

    // Add items based on trip duration
    if (tripDuration > 7) {
      suggestedItems.push({ name: "Laundry bag", category: "misc", essential: false });
    }

    // Add items based on climate
    if (climate === "warm" || climate === "hot") {
      suggestedItems.push(
        { name: "Sunscreen", category: "toiletries", essential: true },
        { name: "Sunglasses", category: "clothing", essential: true },
        { name: "Hat", category: "clothing", essential: false },
        { name: "Lightweight clothing", category: "clothing", essential: true }
      );
    } else if (climate === "cold") {
      suggestedItems.push(
        { name: "Winter coat", category: "clothing", essential: true },
        { name: "Gloves", category: "clothing", essential: true },
        { name: "Scarf", category: "clothing", essential: false },
        { name: "Thermal underwear", category: "clothing", essential: true }
      );
    } else if (climate === "rainy") {
      suggestedItems.push(
        { name: "Rain jacket", category: "clothing", essential: true },
        { name: "Umbrella", category: "misc", essential: true },
        { name: "Waterproof shoes", category: "clothing", essential: true }
      );
    }

    // Add items based on trip type
    if (tripType === "beach") {
      suggestedItems.push(
        { name: "Swimwear", category: "clothing", essential: true },
        { name: "Beach towel", category: "misc", essential: false },
        { name: "Flip flops", category: "clothing", essential: true }
      );
    } else if (tripType === "winter" || tripDestination.toLowerCase().includes("ski")) {
      suggestedItems.push(
        { name: "Ski gear", category: "clothing", essential: true },
        { name: "Hand warmers", category: "misc", essential: false },
        { name: "Thermal socks", category: "clothing", essential: true }
      );
    } else if (tripType === "business") {
      suggestedItems.push(
        { name: "Business attire", category: "clothing", essential: true },
        { name: "Laptop", category: "electronics", essential: true },
        { name: "Business cards", category: "documents", essential: false },
        { name: "Notebook", category: "misc", essential: false }
      );
    }

    // Filter out items that are already in the list
    const existingItemNames = items.map((item) => item.name.toLowerCase());
    const newSuggestedItems = suggestedItems.filter(
      (item) => !existingItemNames.includes(item.name.toLowerCase())
    );

    // Add new suggested items to the list
    if (newSuggestedItems.length > 0) {
      const newItems = newSuggestedItems.map((item) => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: item.name,
        checked: false,
        category: item.category,
        essential: item.essential,
      }));

      setItems([...items, ...newItems]);
      return true;
    }

    return false;
  };

  // Get filtered items based on the active tab
  const getFilteredItems = () => {
    if (activeTab === "all") {
      return items;
    } else if (activeTab === "essential") {
      return items.filter((item) => item.essential);
    } else if (activeTab === "packed") {
      return items.filter((item) => item.checked);
    } else if (activeTab === "unpacked") {
      return items.filter((item) => !item.checked);
    } else {
      return items.filter((item) => item.category === activeTab);
    }
  };

  // Get progress statistics
  const getProgress = () => {
    if (items.length === 0) return 0;
    return Math.round((items.filter((item) => item.checked).length / items.length) * 100);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(newItemName, selectedCategory);
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <PackagePlus className="mr-2 h-5 w-5" />
            Packing Checklist
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Done" : "Edit"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={generateSuggestedList}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Suggest
            </Button>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2.5 mt-2">
          <div
            className="bg-white h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
        <div className="text-xs text-white/90 mt-1">
          {items.filter((item) => item.checked).length} of {items.length} items packed (
          {getProgress()}%)
        </div>
      </CardHeader>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="essential" className="flex-1">
              Essential
            </TabsTrigger>
            <TabsTrigger value="unpacked" className="flex-1">
              To Pack
            </TabsTrigger>
            <TabsTrigger value="packed" className="flex-1">
              Packed
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="px-4 pt-3 pb-1 border-b">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  placeholder="Add item..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="h-9"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-9 rounded-md border border-input bg-background text-sm px-3"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.emoji} {category.name}
                  </option>
                ))}
              </select>
              <Button type="submit" size="sm" className="h-9">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <ScrollArea className="h-[260px] px-4 py-2">
            <AnimatePresence initial={false}>
              {getFilteredItems().length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquarePlus className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                  <p>No items in this category</p>
                  <p className="text-sm">Add some items or use the "Suggest" button</p>
                </div>
              ) : (
                getFilteredItems().map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`flex items-center py-2 border-b border-gray-100 ${
                        item.checked ? "text-gray-400" : ""
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="mr-2 flex-shrink-0"
                      >
                        {item.checked ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-300" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div
                          className={`${
                            item.checked ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {item.name}
                        </div>
                        <div className="flex items-center mt-0.5">
                          <Badge
                            variant="outline"
                            className="text-xs mr-1 py-0 px-1"
                          >
                            {
                              categories.find((c) => c.id === item.category)
                                ?.emoji
                            }{" "}
                            {
                              categories.find((c) => c.id === item.category)
                                ?.name
                            }
                          </Badge>
                          {item.essential && (
                            <Badge
                              variant="secondary"
                              className="text-xs py-0 px-1"
                            >
                              Essential
                            </Badge>
                          )}
                        </div>
                      </div>

                      {editMode && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-2">
          <div className="text-xs text-gray-500">
            {items.filter((item) => item.checked).length}/{items.length} packed
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetChecked}
            className="text-xs h-7"
          >
            <X className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </CardFooter>
      </Tabs>
    </Card>
  );
} 