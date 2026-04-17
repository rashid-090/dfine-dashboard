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
import { Search, SlidersHorizontal, XCircle, Printer, Pen, Trash2, Plus } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { format } from 'date-fns';

const initialBills = [
  { id: 1, billNo: 'BILL-001', billDate: '2025-03-15', doctorName: 'Dr. Ahmed Hassan', doctorId: 'DOC-001', mobile: '97412345678', netAmount: 1500, received: 1500, balance: 0, status: 'Paid' },
  { id: 2, billNo: 'BILL-002', billDate: '2025-03-16', doctorName: 'Dr. Fatima Ali', doctorId: 'DOC-002', mobile: '97412345679', netAmount: 2300, received: 1000, balance: 1300, status: 'Unpaid' },
  { id: 3, billNo: 'BILL-003', billDate: '2025-03-17', doctorName: 'Dr. Mohammed Khan', doctorId: 'DOC-003', mobile: '97412345680', netAmount: 890, received: 890, balance: 0, status: 'Paid' },
  { id: 4, billNo: 'BILL-004', billDate: '2025-03-18', doctorName: 'Dr. Sara Ibrahim', doctorId: 'DOC-004', mobile: '97412345681', netAmount: 3200, received: 0, balance: 3200, status: 'Unpaid' },
  { id: 5, billNo: 'BILL-005', billDate: '2025-03-19', doctorName: 'Dr. Omar Farooq', doctorId: 'DOC-005', mobile: '97412345682', netAmount: 450, received: 450, balance: 0, status: 'Paid' },
  { id: 6, billNo: 'BILL-006', billDate: '2025-03-20', doctorName: 'Dr. Layla Mahmoud', doctorId: 'DOC-006', mobile: '97412345683', netAmount: 6700, received: 5000, balance: 1700, status: 'Unpaid' },
  { id: 7, billNo: 'BILL-007', billDate: '2025-03-21', doctorName: 'Dr. Yusuf Nasser', doctorId: 'DOC-007', mobile: '97412345684', netAmount: 1200, received: 1200, balance: 0, status: 'Paid' },
  { id: 8, billNo: 'BILL-008', billDate: '2025-03-22', doctorName: 'Dr. Noura Salem', doctorId: 'DOC-008', mobile: '97412345685', netAmount: 2800, received: 2800, balance: 0, status: 'Paid' },
  { id: 9, billNo: 'BILL-009', billDate: '2025-03-23', doctorName: 'Dr. Khalid Al-Rashid', doctorId: 'DOC-009', mobile: '97412345686', netAmount: 5400, received: 2000, balance: 3400, status: 'Unpaid' },
  { id: 10, billNo: 'BILL-010', billDate: '2025-03-24', doctorName: 'Dr. Aisha Bint', doctorId: 'DOC-010', mobile: '97412345687', netAmount: 900, received: 0, balance: 900, status: 'Unpaid' },
  { id: 11, billNo: 'BILL-011', billDate: '2025-03-25', doctorName: 'Dr. Hassan Abdullah', doctorId: 'DOC-011', mobile: '97412345688', netAmount: 4100, received: 4100, balance: 0, status: 'Paid' },
  { id: 12, billNo: 'BILL-012', billDate: '2025-03-26', doctorName: 'Dr. Mariam Al-Farsi', doctorId: 'DOC-012', mobile: '97412345689', netAmount: 1750, received: 1750, balance: 0, status: 'Paid' },
  { id: 13, billNo: 'BILL-013', billDate: '2025-03-27', doctorName: 'Dr. Rashid Al-Mansoor', doctorId: 'DOC-013', mobile: '97412345690', netAmount: 3300, received: 1500, balance: 1800, status: 'Unpaid' },
  { id: 14, billNo: 'BILL-014', billDate: '2025-03-28', doctorName: 'Dr. Zainab Noor', doctorId: 'DOC-014', mobile: '97412345691', netAmount: 2650, received: 2650, balance: 0, status: 'Paid' },
  { id: 15, billNo: 'BILL-015', billDate: '2025-03-29', doctorName: 'Dr. Tariq Zaid', doctorId: 'DOC-015', mobile: '97412345692', netAmount: 1800, received: 1800, balance: 0, status: 'Paid' },
];

const BillsPage = () => {
  const [bills] = useState(initialBills);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const filteredBills = useMemo(() => {
    let filtered = bills;

    if (selectedStatusFilter !== 'all') {
      filtered = filtered.filter(bill => 
        selectedStatusFilter === 'paid' ? bill.status === 'Paid' : bill.status === 'Unpaid'
      );
    }

    return filtered.filter((bill) => {
      if (selectedFilter === 'all') {
        return true;
      }

      if (selectedFilter === 'date' && dateRange.from) {
        const billDate = new Date(bill.billDate);
        if (dateRange.from && billDate < dateRange.from) return false;
        if (dateRange.to && billDate > dateRange.to) return false;
        return true;
      }

      const value = String(bill[selectedFilter] || '').toLowerCase();
      const search = searchTerm.toLowerCase();
      
      if (selectedFilter === 'doctorName' || selectedFilter === 'doctorId' || selectedFilter === 'mobile' || selectedFilter === 'billNo') {
        return value.includes(search);
      }

      return true;
    });
  }, [bills, selectedFilter, searchTerm, dateRange, selectedStatusFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('all');
    setSelectedStatusFilter('all');
    setDateRange({ from: null, to: null });
    toast.success('Filters cleared');
  };

  const hasActiveFilters = selectedFilter !== 'all' || searchTerm || dateRange.from || selectedStatusFilter !== 'all';

  return (
    <div className="p-3 md:p-6 w-full space-y-10 bg-background">
      <Toaster position="bottom-right" />
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Bill Management</h2>
          <Button 
            className="bg-main hover:bg-mainhvr cursor-pointer rounded-none px-6 font-semibold transition-colors"
            onClick={() => toast.success('Create new bill')}
          >
            <Plus size={16} className="mr-2" />
            Create Bill
          </Button>
        </div>
        <hr className="border-border" />
      </div>

      <div className="space-y-6 border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3">
            <Label htmlFor="filter-by" className="text-sm font-medium text-foreground mb-2 block">Filter By</Label>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger id="filter-by" className="rounded-none border-input">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bills</SelectItem>
                <SelectItem value="date">Bill Date</SelectItem>
                <SelectItem value="doctorName">Doctor Name</SelectItem>
                <SelectItem value="doctorId">Doctor ID</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="billNo">Bill No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-4">
            <Label htmlFor="search" className="text-sm font-medium text-foreground mb-2 block">
              {selectedFilter === 'date' ? 'Select Date Range' : 'Search Value'}
            </Label>
            {selectedFilter === 'date' ? (
              <DateRangePicker date={dateRange} onDateChange={setDateRange} />
            ) : (
              <Input 
                id="search" 
                placeholder={selectedFilter === 'doctorName' ? "Enter doctor name" : 
                           selectedFilter === 'doctorId' ? "Enter doctor ID" : 
                           selectedFilter === 'mobile' ? "Enter mobile number" : 
                           selectedFilter === 'billNo' ? "Enter bill number" : "Search..."}
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4 border-t border-border">
          <div className="md:col-span-3">
            <Label htmlFor="status-filter" className="text-sm font-medium text-foreground mb-2 block">Bill Status</Label>
            <Select value={selectedStatusFilter} onValueChange={setSelectedStatusFilter}>
              <SelectTrigger id="status-filter" className="rounded-none border-input">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bills</SelectItem>
                <SelectItem value="paid">Paid Bills</SelectItem>
                <SelectItem value="unpaid">Unpaid Bills</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>Active filters:</span>
            {selectedFilter !== 'all' && (
              <span className="bg-muted px-2 py-1 rounded">
                Filter: {selectedFilter === 'date' ? 'Bill Date' : 
                        selectedFilter === 'doctorName' ? 'Doctor Name' : 
                        selectedFilter === 'doctorId' ? 'Doctor ID' : 
                        selectedFilter === 'mobile' ? 'Mobile' : 'Bill No'}
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
            {selectedStatusFilter !== 'all' && (
              <span className="bg-muted px-2 py-1 rounded">
                Status: {selectedStatusFilter === 'paid' ? 'Paid' : 'Unpaid'}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-2">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">Bill List</h3>
          <span className="text-xs font-mono text-muted-foreground">
            {filteredBills.length} {filteredBills.length === 1 ? 'Record' : 'Records'} Found
          </span>
        </div>

        <div className="border border-border">
          <Table>
            <TableHeader className="bg-muted text-foreground">
              <TableRow>
                <TableHead className="text-center font-bold uppercase text-[10px]">S.No.</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Bill No.</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Bill Date</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Net Amount(QAR)</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Received(QAR)</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Balance(QAR)</TableHead>
                <TableHead className="text-center font-bold uppercase text-[10px]">Status</TableHead>
                <TableHead className="text-right font-bold uppercase text-[10px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-8">
                    No bills found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredBills.map((bill, index) => (
                  <TableRow key={bill.id} className="hover:bg-muted/50 border-border transition-colors">
                    <TableCell className="text-center text-sm text-foreground">{index + 1}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground font-mono">{bill.billNo}</TableCell>
                    <TableCell className="text-sm text-foreground">{bill.billDate}</TableCell>
                    <TableCell className="text-sm text-foreground text-right">{bill.netAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-foreground text-right">{bill.received.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-foreground text-right">{bill.balance.toLocaleString()}</TableCell>
                    <TableCell className="text-center text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bill.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-end gap-4 py-3 px-4 text-muted-foreground">
                      <button onClick={() => toast.success('Print bill')} className="hover:text-foreground transition-colors" title="Print Bill">
                        <Printer size={16} />
                      </button>
                      <button onClick={() => toast.success('Edit bill')} className="hover:text-foreground transition-colors" title="Edit Bill">
                        <Pen size={16} />
                      </button>
                      <button onClick={() => toast.success('Delete bill')} className="hover:text-destructive transition-colors" title="Delete Bill">
                        <Trash2 size={16} />
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

export default BillsPage;