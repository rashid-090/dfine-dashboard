'use client';
import React, { useState, useMemo } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Search, SlidersHorizontal, XCircle, Printer, Eye, Tag, Plus } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { format } from 'date-fns';

// Mock order data
const initialOrders = [
  { id: 1, date: '2025-03-15', name: 'Ahmed Hassan', orderNo: 'ORD-001', formNo: 'F-1001', amount: 1500, status: 'Completed' },
  { id: 2, date: '2025-03-16', name: 'Fatima Ali', orderNo: 'ORD-002', formNo: 'F-1002', amount: 2300, status: 'Pending' },
  { id: 3, date: '2025-03-17', name: 'Mohammed Khan', orderNo: 'ORD-003', formNo: 'F-1003', amount: 890, status: 'Completed' },
  { id: 4, date: '2025-03-18', name: 'Sara Ibrahim', orderNo: 'ORD-004', formNo: 'F-1004', amount: 3200, status: 'Shipped' },
  { id: 5, date: '2025-03-19', name: 'Omar Farooq', orderNo: 'ORD-005', formNo: 'F-1005', amount: 450, status: 'Pending' },
  { id: 6, date: '2025-03-20', name: 'Layla Mahmoud', orderNo: 'ORD-006', formNo: 'F-1006', amount: 6700, status: 'Completed' },
  { id: 7, date: '2025-03-21', name: 'Yusuf Nasser', orderNo: 'ORD-007', formNo: 'F-1007', amount: 1200, status: 'Cancelled' },
  { id: 8, date: '2025-03-22', name: 'Noura Salem', orderNo: 'ORD-008', formNo: 'F-1008', amount: 2800, status: 'Shipped' },
  { id: 9, date: '2025-03-23', name: 'Khalid Al-Rashid', orderNo: 'ORD-009', formNo: 'F-1009', amount: 5400, status: 'Completed' },
  { id: 10, date: '2025-03-24', name: 'Aisha Bint', orderNo: 'ORD-010', formNo: 'F-1010', amount: 900, status: 'Pending' },
  { id: 11, date: '2025-03-25', name: 'Hassan Abdullah', orderNo: 'ORD-011', formNo: 'F-1011', amount: 4100, status: 'Shipped' },
  { id: 12, date: '2025-03-26', name: 'Mariam Al-Farsi', orderNo: 'ORD-012', formNo: 'F-1012', amount: 1750, status: 'Completed' },
  { id: 13, date: '2025-03-27', name: 'Rashid Al-Mansoor', orderNo: 'ORD-013', formNo: 'F-1013', amount: 3300, status: 'Pending' },
  { id: 14, date: '2025-03-28', name: 'Zainab Noor', orderNo: 'ORD-014', formNo: 'F-1014', amount: 2650, status: 'Shipped' },
  { id: 15, date: '2025-03-29', name: 'Tariq Zaid', orderNo: 'ORD-015', formNo: 'F-1015', amount: 1800, status: 'Completed' },
];

const OrderPage = () => {
  const [orders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Filter orders based on criteria
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // All filter - show everything
      if (selectedFilter === 'all') {
        return true;
      }

      // Date range filter
      if (selectedFilter === 'date' && dateRange.from) {
        const orderDate = new Date(order.date);
        if (dateRange.from && orderDate < dateRange.from) return false;
        if (dateRange.to && orderDate > dateRange.to) return false;
        return true;
      }

      // Text-based filters (name, orderNo, formNo)
      const value = String(order[selectedFilter] || '').toLowerCase();
      const search = searchTerm.toLowerCase();
      
      if (selectedFilter === 'name' || selectedFilter === 'orderNo' || selectedFilter === 'formNo') {
        return value.includes(search);
      }

      return true;
    });
  }, [orders, selectedFilter, searchTerm, dateRange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('all');
    setDateRange({ from: null, to: null });
    toast.success('Filters cleared');
  };

  const hasActiveFilters = selectedFilter !== 'all' || searchTerm || dateRange.from;

  return (
    <div className="p-3 md:p-6 w-full space-y-10 bg-background">
      <Toaster position="bottom-right" />
      
      {/* Header */}
     
       <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Order Management</h2>
          <Button 
            className="bg-main hover:bg-mainhvr cursor-pointer rounded-none px-6 font-semibold transition-colors"
            onClick={() => toast.success('Create new delivery challan')}
          >
            <Plus size={16} className="mr-2" />
            Create Order
          </Button>
        </div>
        <hr className="border-border" />
      </div>

      {/* Search & Filter Section */}
      <div className="space-y-6 border border-border p-4">
        {/* Main filter controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Filter by dropdown */}
          <div className="md:col-span-3">
            <Label htmlFor="filter-by" className="text-sm font-medium text-foreground mb-2 block">Filter By</Label>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger id="filter-by" className="rounded-none border-input">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="date">Date Range</SelectItem>
                <SelectItem value="name">Customer Name</SelectItem>
                <SelectItem value="orderNo">Order No</SelectItem>
                <SelectItem value="formNo">Form No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search input (for text filters) */}
          <div className="md:col-span-4 relative">
            <Label htmlFor="search" className="text-sm font-medium text-foreground mb-2 block">
              {selectedFilter === 'date' ? 'Select Date Range' : 'Search Value'}
            </Label>
            {selectedFilter === 'date' ? (
              <DateRangePicker date={dateRange} onDateChange={setDateRange} />
            ) : (
              <Input 
                id="search" 
                placeholder={selectedFilter === 'name' ? "Enter customer name" : 
                           selectedFilter === 'orderNo' ? "Enter order number" : 
                           selectedFilter === 'formNo' ? "Enter form number" : "Search..."}
                className="rounded-none border-input pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            {searchTerm && selectedFilter !== 'date' && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              >
                <XCircle size={16} />
              </button>
            )}
          </div>

          {/* Search button */}
          <div className="md:col-span-2">
            <Label className="text-sm font-medium text-foreground mb-2 block opacity-0">Search</Label>
            <Button 
              className="bg-main hover:bg-mainhvr cursor-pointer rounded-none px-6 font-semibold transition-colors w-full"
              onClick={() => toast.success('Search applied')}
            >
              <Search size={16} className="mr-2" />
              Search
            </Button>
          </div>

          {/* Clear filters button */}
          <div className="md:col-span-3">
            <Label className="text-sm font-medium text-foreground mb-2 block opacity-0">Clear</Label>
            <Button 
              variant="outline"
              className={`rounded-none px-6 font-semibold transition-colors w-full border-border ${!hasActiveFilters ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}`}
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>Active filters:</span>
            {selectedFilter !== 'all' && (
              <span className="bg-muted px-2 py-1 rounded">
                Filter: {selectedFilter === 'date' ? 'Date Range' : 
                        selectedFilter === 'name' ? 'Name' : 
                        selectedFilter === 'orderNo' ? 'Order No' : 'Form No'}
              </span>
            )}
            {searchTerm && selectedFilter !== 'date' && (
              <span className="bg-muted px-2 py-1 rounded">
                Search: "{searchTerm}"
              </span>
            )}
            {dateRange.from && (
              <span className="bg-muted px-2 py-1 rounded">
                From: {format(dateRange.from, 'LLL dd, y')}
                {dateRange.to && ` - To: ${format(dateRange.to, 'LLL dd, y')}`}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-2">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">Order List</h3>
          <span className="text-xs font-mono text-muted-foreground">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'Record' : 'Records'} Found
          </span>
        </div>

        <div className="border border-border">
          <Table>
            <TableHeader className="bg-muted text-foreground">
              <TableRow>
                <TableHead className="text-center font-bold uppercase text-[10px]">Date</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Customer Name</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Order No</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Form No</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Status</TableHead>
                <TableHead className="text-right font-bold uppercase text-[10px] px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                    No orders found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, index) => (
                  <TableRow key={order.id} className="hover:bg-muted/50 border-border transition-colors">
                    <TableCell className="text-center text-sm text-foreground">{order.date}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground">{order.name}</TableCell>
                    <TableCell className="text-sm text-foreground font-mono">{order.orderNo}</TableCell>
                    <TableCell className="text-sm text-foreground font-mono">{order.formNo}</TableCell>
                    <TableCell className="text-center text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-end gap-4 py-3 px-6 text-muted-foreground">
                      <button onClick={() => toast.success('Print order')} className="hover:text-foreground transition-colors" title="Print Order">
                        <Printer size={16} />
                      </button>
                      <button onClick={() => toast.success('View order')} className="hover:text-foreground transition-colors" title="View Order">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => toast.success('View label')} className="hover:text-foreground transition-colors" title="View Label">
                        <Tag size={16} />
                      </button>
                    </TableCell>
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

export default OrderPage;
