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
import { Search, SlidersHorizontal, XCircle, Printer, Edit, Trash2, Plus } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { format } from 'date-fns';

// Mock receipt data
const initialReceipts = [
  { id: 1, receiptNo: 'REC-001', receiptDate: '2025-03-15', doctorName: 'Dr. Ahmed Hassan', mobile: '0501234567', paymentMode: 'Cash', paymentDetails: 'Consultation fee', amount: 150 },
  { id: 2, receiptNo: 'REC-002', receiptDate: '2025-03-16', doctorName: 'Dr. Fatima Ali', mobile: '0502345678', paymentMode: 'Card', paymentDetails: 'Check-up fee', amount: 200 },
  { id: 3, receiptNo: 'REC-003', receiptDate: '2025-03-17', doctorName: 'Dr. Mohammed Khan', mobile: '0503456789', paymentMode: 'Cash', paymentDetails: 'Treatment fee', amount: 300 },
  { id: 4, receiptNo: 'REC-004', receiptDate: '2025-03-18', doctorName: 'Dr. Sara Ibrahim', mobile: '0504567890', paymentMode: 'Bank Transfer', paymentDetails: 'Surgery fee', amount: 500 },
  { id: 5, receiptNo: 'REC-005', receiptDate: '2025-03-19', doctorName: 'Dr. Omar Farooq', mobile: '0505678901', paymentMode: 'Cash', paymentDetails: 'Consultation fee', amount: 180 },
  { id: 6, receiptNo: 'REC-006', receiptDate: '2025-03-20', doctorName: 'Dr. Layla Mahmoud', mobile: '0506789012', paymentMode: 'Card', paymentDetails: 'Follow-up fee', amount: 250 },
  { id: 7, receiptNo: 'REC-007', receiptDate: '2025-03-21', doctorName: 'Dr. Yusuf Nasser', mobile: '0507890123', paymentMode: 'Cash', paymentDetails: 'Prescription fee', amount: 120 },
  { id: 8, receiptNo: 'REC-008', receiptDate: '2025-03-22', doctorName: 'Dr. Noura Salem', mobile: '0508901234', paymentMode: 'Bank Transfer', paymentDetails: 'Lab test fee', amount: 400 },
  { id: 9, receiptNo: 'REC-009', receiptDate: '2025-03-23', doctorName: 'Dr. Khalid Al-Rashid', mobile: '0509012345', paymentMode: 'Cash', paymentDetails: 'Consultation fee', amount: 160 },
  { id: 10, receiptNo: 'REC-010', receiptDate: '2025-03-24', doctorName: 'Dr. Aisha Bint', mobile: '0500123456', paymentMode: 'Card', paymentDetails: 'Check-up fee', amount: 220 },
];

const ReceiptsPage = () => {
  const [receipts] = useState(initialReceipts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  // Filter receipts based on criteria
  const filteredReceipts = useMemo(() => {
    return receipts.filter((receipt) => {
      // All filter - show everything
      if (selectedFilter === 'all') {
        return true;
      }

      // Date range filter
      if (selectedFilter === 'receiptDate' && dateRange.from) {
        const receiptDate = new Date(receipt.receiptDate);
        if (dateRange.from && receiptDate < dateRange.from) return false;
        if (dateRange.to && receiptDate > dateRange.to) return false;
        return true;
      }

      // Text-based filters (doctorName, mobile, receiptNo)
      const value = String(receipt[selectedFilter] || '').toLowerCase();
      const search = searchTerm.toLowerCase();

      if (selectedFilter === 'doctorName' || selectedFilter === 'mobile' || selectedFilter === 'receiptNo') {
        return value.includes(search);
      }

      return true;
    });
  }, [receipts, selectedFilter, searchTerm, dateRange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('all');
    setDateRange({ from: null, to: null });
    toast.success('Filters cleared');
  };

  const handleEdit = (receipt) => {
    toast.success(`Edit receipt ${receipt.receiptNo}`);
  };

  const handleDelete = (receipt) => {
    toast.success(`Delete receipt ${receipt.receiptNo}`);
  };

  const handlePrint = (receipt) => {
    toast.success(`Print receipt ${receipt.receiptNo}`);
  };

  const hasActiveFilters = selectedFilter !== 'all' || searchTerm || dateRange.from;

  return (
    <div className="p-3 md:p-6 w-full space-y-10 bg-background">
      <Toaster position="bottom-right" />

      {/* Header */}
    

       <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Receipts Management</h2>
          <Button 
            className="bg-main hover:bg-mainhvr cursor-pointer rounded-none px-6 font-semibold transition-colors"
            onClick={() => toast.success('Create new receipt')}
          >
            <Plus size={16} className="mr-2" />
            New Receipt
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
                <SelectItem value="all">All Receipts</SelectItem>
                <SelectItem value="receiptDate">Receipt Date</SelectItem>
                <SelectItem value="doctorName">Doctor Name</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="receiptNo">Receipt No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search input (for text filters) */}
          <div className="md:col-span-4 relative">
            <Label htmlFor="search" className="text-sm font-medium text-foreground mb-2 block">
              {selectedFilter === 'receiptDate' ? 'Select Date Range' : 'Search Value'}
            </Label>
            {selectedFilter === 'receiptDate' ? (
              <DateRangePicker date={dateRange} onDateChange={setDateRange} />
            ) : (
              <Input
                id="search"
                placeholder={selectedFilter === 'doctorName' ? "Enter doctor name" :
                           selectedFilter === 'mobile' ? "Enter mobile number" :
                           selectedFilter === 'receiptNo' ? "Enter receipt number" : "Search..."}
                className="rounded-none border-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            {searchTerm && selectedFilter !== 'receiptDate' && (
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
                Filter: {selectedFilter === 'receiptDate' ? 'Receipt Date' :
                        selectedFilter === 'doctorName' ? 'Doctor Name' :
                        selectedFilter === 'mobile' ? 'Mobile' :
                        selectedFilter === 'receiptNo' ? 'Receipt No' : ''}
              </span>
            )}
            {searchTerm && selectedFilter !== 'receiptDate' && (
              <span className="bg-muted px-2 py-1 rounded">
                Search: &ldquo;{searchTerm}&rdquo;
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
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">Receipts List</h3>
          <span className="text-xs font-mono text-muted-foreground">
            {filteredReceipts.length} {filteredReceipts.length === 1 ? 'Record' : 'Records'} Found
          </span>
        </div>

        <div className="border border-border">
          <Table>
            <TableHeader className="bg-muted text-foreground">
              <TableRow>
                <TableHead className="text-center font-bold uppercase text-[10px]">S. No.</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Receipt No.</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Receipt Date</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Payment Mode</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Payment Details</TableHead>
                <TableHead className="text-right font-bold uppercase text-[10px]">Amount</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
                    No receipts found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredReceipts.map((receipt, index) => (
                  <TableRow key={receipt.id} className="hover:bg-muted/50 border-border transition-colors">
                    <TableCell className="text-center text-sm text-foreground">{index + 1}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground font-mono">{receipt.receiptNo}</TableCell>
                    <TableCell className="text-sm text-foreground">{receipt.receiptDate}</TableCell>
                    <TableCell className="text-sm text-foreground">{receipt.paymentMode}</TableCell>
                    <TableCell className="text-sm text-foreground">{receipt.paymentDetails}</TableCell>
                    <TableCell className="text-right text-sm font-medium text-foreground">${receipt.amount}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(receipt)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit Receipt"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(receipt)}
                          className="text-muted-foreground hover:text-red-600 transition-colors"
                          title="Delete Receipt"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => handlePrint(receipt)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="Print Receipt"
                        >
                          <Printer size={16} />
                        </button>
                      </div>
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

export default ReceiptsPage;
