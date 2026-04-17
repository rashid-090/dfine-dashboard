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
import { Search, SlidersHorizontal, Eye, Printer, Plus } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { format } from 'date-fns';

// Mock delivery challan data
const initialDeliveryChallans = [
  { 
    id: 1, 
    dcNo: 'DC-001', 
    orderNo: 'ORD-001', 
    ofNo: 'F-1001', 
    dcDate: '2025-03-20', 
    doctorName: 'Dr. Ahmed Hassan', 
    patientName: 'Mohammed Al-Farsi', 
    netAmount: 1500, 
    currency: 'QAR',
    status: 'Delivered' 
  },
  { 
    id: 2, 
    dcNo: 'DC-002', 
    orderNo: 'ORD-003', 
    ofNo: 'F-1003', 
    dcDate: '2025-03-21', 
    doctorName: 'Dr. Fatima Ali', 
    patientName: 'Sara Khalid', 
    netAmount: 890, 
    currency: 'QAR',
    status: 'Delivered' 
  },
  { 
    id: 3, 
    dcNo: 'DC-003', 
    orderNo: 'ORD-005', 
    ofNo: 'F-1005', 
    dcDate: '2025-03-22', 
    doctorName: 'Dr. Mohammed Khan', 
    patientName: 'Omar Nasser', 
    netAmount: 450, 
    currency: 'QAR',
    status: 'In Transit' 
  },
  { 
    id: 4, 
    dcNo: 'DC-004', 
    orderNo: 'ORD-008', 
    ofNo: 'F-1008', 
    dcDate: '2025-03-23', 
    doctorName: 'Dr. Sara Ibrahim', 
    patientName: 'Layla Mahmoud', 
    netAmount: 2800, 
    currency: 'QAR',
    status: 'Delivered' 
  },
  { 
    id: 5, 
    dcNo: 'DC-005', 
    orderNo: 'ORD-010', 
    ofNo: 'F-1010', 
    dcDate: '2025-03-24', 
    doctorName: 'Dr. Omar Farooq', 
    patientName: 'Aisha Bint', 
    netAmount: 900, 
    currency: 'QAR',
    status: 'Pending' 
  },
  { 
    id: 6, 
    dcNo: 'DC-006', 
    orderNo: 'ORD-012', 
    ofNo: 'F-1012', 
    dcDate: '2025-03-25', 
    doctorName: 'Dr. Layla Mahmoud', 
    patientName: 'Mariam Al-Farsi', 
    netAmount: 1750, 
    currency: 'QAR',
    status: 'Delivered' 
  },
  { 
    id: 7, 
    dcNo: 'DC-007', 
    orderNo: 'ORD-014', 
    ofNo: 'F-1014', 
    dcDate: '2025-03-26', 
    doctorName: 'Dr. Yusuf Nasser', 
    patientName: 'Zainab Noor', 
    netAmount: 2650, 
    currency: 'QAR',
    status: 'In Transit' 
  },
  { 
    id: 8, 
    dcNo: 'DC-008', 
    orderNo: 'ORD-002', 
    ofNo: 'F-1002', 
    dcDate: '2025-03-27', 
    doctorName: 'Dr. Khalid Al-Rashid', 
    patientName: 'Hassan Abdullah', 
    netAmount: 2300, 
    currency: 'QAR',
    status: 'Delivered' 
  },
];

const DeliveryChallanPage = () => {
  const [challans] = useState(initialDeliveryChallans);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  // Filter delivery challans based on criteria
  const filteredChallans = useMemo(() => {
    return challans.filter((challan) => {
      if (selectedFilter === 'all') {
        return true;
      }

      if (selectedFilter === 'date' && dateRange.from) {
        const challanDate = new Date(challan.dcDate);
        if (dateRange.from && challanDate < dateRange.from) return false;
        if (dateRange.to && challanDate > dateRange.to) return false;
        return true;
      }

      const value = String(challan[selectedFilter] || '').toLowerCase();
      const search = searchTerm.toLowerCase();
      
      if (['dcNo', 'orderNo', 'ofNo', 'doctorName', 'patientName'].includes(selectedFilter)) {
        return value.includes(search);
      }

      return true;
    });
  }, [challans, selectedFilter, searchTerm, dateRange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('all');
    setDateRange({ from: null, to: null });
    toast.success('Filters cleared');
  };

  const hasActiveFilters = selectedFilter !== 'all' || searchTerm || dateRange.from;

  const handlePrintDC = (dcNo) => {
    toast.success(`Printing delivery challan ${dcNo}`);
  };

  const handleViewDC = (dcNo) => {
    toast.success(`Viewing delivery challan ${dcNo}`);
  };

  return (
    <div className="p-3 md:p-6 w-full space-y-10 bg-background">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Delivery Challan Management</h2>
          <Button 
            className="bg-main hover:bg-mainhvr cursor-pointer rounded-none px-6 font-semibold transition-colors"
            onClick={() => toast.success('Create new delivery challan')}
          >
            <Plus size={16} className="mr-2" />
            New Delivery Challan
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
                <SelectItem value="all">All Delivery Challans</SelectItem>
                <SelectItem value="date">DC Date Range</SelectItem>
                <SelectItem value="dcNo">DC Number</SelectItem>
                <SelectItem value="orderNo">Order No</SelectItem>
                <SelectItem value="ofNo">O.F No</SelectItem>
                <SelectItem value="doctorName">Doctor Name</SelectItem>
                <SelectItem value="patientName">Patient Name</SelectItem>
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
                placeholder={
                  selectedFilter === 'dcNo' ? "Enter DC number" :
                  selectedFilter === 'orderNo' ? "Enter order number" :
                  selectedFilter === 'ofNo' ? "Enter O.F number" :
                  selectedFilter === 'doctorName' ? "Enter doctor name" :
                  selectedFilter === 'patientName' ? "Enter patient name" : "Search..."
                }
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
                <Search size={16} />
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
                Filter: {selectedFilter === 'date' ? 'DC Date' : 
                        selectedFilter === 'dcNo' ? 'DC No' :
                        selectedFilter === 'orderNo' ? 'Order No' :
                        selectedFilter === 'ofNo' ? 'O.F No' :
                        selectedFilter === 'doctorName' ? 'Doctor Name' : 'Patient Name'}
              </span>
            )}
            {searchTerm && selectedFilter !== 'date' && (
              <span className="bg-muted px-2 py-1 rounded">
                Search: &quot;{searchTerm}&quot;
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
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">Delivery Challan List</h3>
          <span className="text-xs font-mono text-muted-foreground">
            {filteredChallans.length} {filteredChallans.length === 1 ? 'Record' : 'Records'} Found
          </span>
        </div>

        <div className="border border-border">
          <Table>
            <TableHeader className="bg-muted text-foreground">
              <TableRow>
                <TableHead className="text-center font-bold uppercase text-[10px]">DC No</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">DC Date</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Order No</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">O.F No</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Doctor Name</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Patient Name</TableHead>
                <TableHead className="text-right font-bold uppercase text-[10px] px-6">Net Amount</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Status</TableHead>
                <TableHead className="text-right font-bold uppercase text-[10px] px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChallans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-sm text-muted-foreground py-8">
                    No delivery challans found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredChallans.map((challan) => (
                  <TableRow key={challan.id} className="hover:bg-muted/50 border-border transition-colors">
                    <TableCell className="text-center text-sm text-foreground font-mono">{challan.dcNo}</TableCell>
                    <TableCell className="text-center text-sm text-foreground">{challan.dcDate}</TableCell>
                    <TableCell className="text-sm text-foreground font-mono">{challan.orderNo}</TableCell>
                    <TableCell className="text-sm text-foreground font-mono">{challan.ofNo}</TableCell>
                    <TableCell className="text-sm text-foreground">{challan.doctorName}</TableCell>
                    <TableCell className="text-sm text-foreground font-medium">{challan.patientName}</TableCell>
                    <TableCell className="text-right text-sm text-foreground font-mono px-6">
                      {challan.netAmount.toLocaleString()} {challan.currency}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        challan.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        challan.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        challan.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {challan.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-end gap-4 py-3 px-6 text-muted-foreground">
                      <button onClick={() => handlePrintDC(challan.dcNo)} className="hover:text-foreground transition-colors" title="Print DC">
                        <Printer size={16} />
                      </button>
                      <button onClick={() => handleViewDC(challan.dcNo)} className="hover:text-foreground transition-colors" title="View DC">
                        <Eye size={16} />
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

export default DeliveryChallanPage;
