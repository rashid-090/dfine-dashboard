'use client';
import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, XCircle } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

// Mock stock data
const initialStockItems = [
  { id: 1, itemDescription: 'Paracetamol 500mg Tablets', purchaseQty: 1000, issueQty: 350, reorder: 100, measure: 'box' },
  { id: 2, itemDescription: 'Amoxicillin 250mg Capsules', purchaseQty: 500, issueQty: 120, reorder: 50, measure: 'box' },
  { id: 3, itemDescription: 'Ibuprofen 200mg Tablets', purchaseQty: 800, issueQty: 280, reorder: 80, measure: 'box' },
  { id: 4, itemDescription: 'Insulin Injection 100IU/ml', purchaseQty: 200, issueQty: 45, reorder: 20, measure: 'piece' },
  { id: 5, itemDescription: 'Bandages 5cm x 5m', purchaseQty: 300, issueQty: 95, reorder: 30, measure: 'piece' },
  { id: 6, itemDescription: 'Surgical Gloves Size M', purchaseQty: 600, issueQty: 180, reorder: 60, measure: 'box' },
  { id: 7, itemDescription: 'Face Masks N95', purchaseQty: 400, issueQty: 150, reorder: 40, measure: 'box' },
  { id: 8, itemDescription: 'Cotton Wool 500g', purchaseQty: 150, issueQty: 40, reorder: 15, measure: 'piece' },
  { id: 9, itemDescription: 'Thermometer Digital', purchaseQty: 100, issueQty: 25, reorder: 10, measure: 'piece' },
  { id: 10, itemDescription: 'Stethoscope Standard', purchaseQty: 50, issueQty: 8, reorder: 5, measure: 'piece' },
];

const StockPage = () => {
  const [stockItems] = useState(initialStockItems);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter stock items based on search term
  const filteredStockItems = useMemo(() => {
    if (!searchTerm) return stockItems;
    return stockItems.filter((item) =>
      item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stockItems, searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    toast.success('Search cleared');
  };

  return (
    <div className="p-3 md:p-6 w-full space-y-10 bg-background">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Stock Management</h2>
        </div>
        <hr className="border-border" />
      </div>

      {/* Search Section */}
      <div className="space-y-6 border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Search input */}
          <div className="md:col-span-6 relative">
            <Label htmlFor="search" className="text-sm font-medium text-foreground mb-2 block">Search Item Description</Label>
            <Input
              id="search"
              placeholder="Enter item description to search..."
              className="rounded-none border-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              >
                <XCircle size={16} />
              </button>
            )}
          </div>

          {/* Search button */}
          <div className="md:col-span-3">
            <Label className="text-sm font-medium text-foreground mb-2 block opacity-0">Search</Label>
            <Button
              className="bg-main hover:bg-mainhvr cursor-pointer rounded-none px-6 font-semibold transition-colors w-full"
              onClick={() => toast.success('Search applied')}
            >
              <Search size={16} className="mr-2" />
              Search
            </Button>
          </div>

          {/* Clear search button */}
          <div className="md:col-span-3">
            <Label className="text-sm font-medium text-foreground mb-2 block opacity-0">Clear</Label>
            <Button
              variant="outline"
              className={`rounded-none px-6 font-semibold transition-colors w-full border-border ${!searchTerm ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}`}
              onClick={handleClearSearch}
              disabled={!searchTerm}
            >
              Clear Search
            </Button>
          </div>
        </div>

        {/* Active search summary */}
        {searchTerm && (
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>Active search:</span>
            <span className="bg-muted px-2 py-1 rounded">
              Search: "{searchTerm}"
            </span>
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-2">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">Stock Items</h3>
          <span className="text-xs font-mono text-muted-foreground">
            {filteredStockItems.length} {filteredStockItems.length === 1 ? 'Item' : 'Items'} Found
          </span>
        </div>

        <div className="border border-border">
          <Table>
            <TableHeader className="bg-muted text-foreground">
              <TableRow>
                <TableHead className="text-center font-bold uppercase text-[10px]">S. No</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Item Description</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Purchase Qty</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Issue Qty</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Stock</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Reorder</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Measure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStockItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
                    No stock items found matching your search
                  </TableCell>
                </TableRow>
              ) : (
                filteredStockItems.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-muted/50 border-border transition-colors">
                    <TableCell className="text-center text-sm text-foreground">{index + 1}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground">{item.itemDescription}</TableCell>
                    <TableCell className="text-center text-sm text-foreground">{item.purchaseQty}</TableCell>
                    <TableCell className="text-center text-sm text-foreground">{item.issueQty}</TableCell>
                    <TableCell className="text-center text-sm font-medium text-foreground">
                      {item.purchaseQty - item.issueQty}
                    </TableCell>
                    <TableCell className="text-center text-sm text-foreground">{item.reorder}</TableCell>
                    <TableCell className="text-center text-sm text-foreground capitalize">{item.measure}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
