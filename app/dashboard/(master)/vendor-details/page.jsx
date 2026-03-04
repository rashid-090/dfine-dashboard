'use client';

import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, RefreshCcw, XCircle, Trash2, Save, Plus } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const VendorManagementPage = () => {
  const [activeTab, setActiveTab] = useState("registration");
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [vendorData, setVendorData] = useState({
    vendorCode: 'V00002',
    salutation: 'Mr.',
    vendorName: 'Demo Vendor',
    street: '',
    areaTown: '', 
    city: '',
    pinCode: '',
    status: 'Active',
    tinNo: '',
    office: '',
    mobile1: '0031110712',
    mobile2: '',
    landmark: '',
    contactPerson: '',
    email: '',
    cstNo: ''
  });

  const [availableProducts] = useState([
    { code: "1202", desc: "PMMA MILLING BUR 1(VHF)" },
    { code: "99646", desc: "BLANK D3 18MM (AICERA)" },

  ]);

  const [assignedProducts, setAssignedProducts] = useState([
    { id: 1, itemCode: "99447", description: "PMMA MILLING BUR 1(VHF)" },
  ]);

  const handleVendorChange = (field, value) => {
    setVendorData(prev => ({ ...prev, [field]: value }));
  };

  // Logic to add selected product to table
  const handleAddProduct = () => {
    if (!selectedProduct) {
      toast.error("Please select a product from the list first");
      return;
    }

    // Check if already assigned
    if (assignedProducts.some(p => p.itemCode === selectedProduct.code)) {
      toast.error("Product already assigned to this vendor");
      return;
    }

    const newEntry = {
      id: Date.now(),
      itemCode: selectedProduct.code,
      description: selectedProduct.desc
    };

    setAssignedProducts([...assignedProducts, newEntry]);
    setSelectedProduct(null); // Reset selection
    toast.success("Product Added");
  };

  // Logic to remove product from table
  const handleRemoveProduct = (id) => {
    setAssignedProducts(assignedProducts.filter(p => p.id !== id));
    toast.success("Product Removed");
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto space-y-6 bg-white min-h-screen font-sans text-black">
      <Toaster position="top-right" />
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 border-b pb-2">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Vendor Management</h1>
        <div className="text-xs text-red-500 font-mono uppercase tracking-tighter">* indicates mandatory</div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-10">
        <TabsList className="bg-gray-100 p-1 rounded-none mb-6 h-10 border">
          <TabsTrigger value="registration" className="rounded-none px-8 data-[state=active]:bg-black data-[state=active]:text-white">
            Vendor Registration
          </TabsTrigger>
          <TabsTrigger value="assign" className="rounded-none px-8 data-[state=active]:bg-black data-[state=active]:text-white">
            Assign Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="registration" className="space-y-6">
          {/* ... [Registration Form Remains the Same] ... */}
          <div className="flex items-center gap-4 border p-4 bg-gray-50">
            <Label className="font-semibold text-xs">Enter Vendor Name:</Label>
            <div className="flex gap-2 w-full max-w-md">
              <Input placeholder="Search..." className="rounded-none border-gray-300 bg-white h-9 text-xs" />
              <Button className="bg-black hover:bg-gray-800 text-white rounded-none px-6 h-9 text-xs font-bold uppercase">Select</Button>
              <Button variant="outline" className="rounded-none h-9 border-gray-300"><RefreshCcw className="w-4 h-4 text-gray-600" /></Button>
            </div>
          </div>
          <div className="border p-6 space-y-6">
             <div className="text-sm font-semibold text-gray-500 tracking-wider border-b pb-2">Vendor Information</div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
               <div className="space-y-4">
                 <div className="grid grid-cols-3 items-center gap-2"><Label className="text-xs">Vendor Code</Label><Input value={vendorData.vendorCode} readOnly className="col-span-2 rounded-none border-gray-300 bg-gray-50 h-9" /></div>
                 <div className="grid grid-cols-3 items-center gap-2">
                   <Label className="text-xs">Vendor Name <span className="text-red-500">*</span></Label>
                   <div className="col-span-2 flex gap-1">
                     <Select value={vendorData.salutation} onValueChange={(v) => handleVendorChange('salutation', v)}>
                        <SelectTrigger className="w-[80px] rounded-none border-gray-300 h-9 bg-white"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-none"><SelectItem value="Mr.">Mr.</SelectItem><SelectItem value="Ms.">Ms.</SelectItem><SelectItem value="M/s.">M/s.</SelectItem></SelectContent>
                     </Select>
                     <Input value={vendorData.vendorName} onChange={(e) => handleVendorChange('vendorName', e.target.value)} className="rounded-none border-gray-300 h-9 bg-white flex-1" />
                   </div>
                 </div>
               </div>
               <div className="space-y-4">
                 <div className="grid grid-cols-3 items-center gap-2"><Label className="text-xs">Mobile 1 <span className="text-red-500">*</span></Label><Input value={vendorData.mobile1} onChange={(e) => handleVendorChange('mobile1', e.target.value)} className="col-span-2 rounded-none border-gray-300 h-9" /></div>
                 <div className="grid grid-cols-3 items-center gap-2">
                   <Label className="text-xs">Status</Label>
                   <div className="col-span-2 flex items-center gap-3">
                    <span className="text-sm">{vendorData.status}</span>
                    <div className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${vendorData.status === 'Active' ? 'bg-green-600' : 'bg-gray-300'}`} onClick={() => handleVendorChange('status', vendorData.status === 'Active' ? 'Inactive' : 'Active')}><div className={`bg-white w-3 h-3 rounded-full transition-transform ${vendorData.status === 'Active' ? 'translate-x-5' : 'translate-x-0'}`} /></div>
                  </div>
                 </div>
               </div>
             </div>
             <div className="flex gap-3 pt-4 border-t"><Button className="rounded-none bg-black text-white px-8"><Save className="w-4 h-4 mr-2" /> Save</Button><Button variant="outline" className="rounded-none border-gray-300 px-8 text-gray-600"><RefreshCcw className="w-4 h-4 mr-2" /> Reset</Button></div>
          </div>
        </TabsContent>

        {/* --- ASSIGN PRODUCT TAB (INTERACTIVE) --- */}
        <TabsContent value="assign" className="space-y-6">
          <div className="flex items-center gap-4 bg-gray-50 p-4 border border-dashed border-gray-300">
            <Label className="font-semibold text-xs  text-gray-500">Selected Vendor:</Label>
            <span className="text-black font-semibold  tracking-tight">{vendorData.vendorName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* PRODUCT SELECTION LIST */}
            <div className="lg:col-span-4 space-y-2">
              <Label className="font-mono block text-xs font-mono text-gray-400 tracking-widest">Inventory List</Label>
              <div className="border border-black h-80 overflow-y-auto bg-white">
                {availableProducts.map((prod, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedProduct(prod)}
                    className={`text-xs font-medium p-3 cursor-pointer border-b last:border-0 uppercase transition-all
                      ${selectedProduct?.code === prod.code 
                        ? 'bg-black text-white' 
                        : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{prod.code} - {prod.desc}</span>
                      {selectedProduct?.code === prod.code && <Plus className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleAddProduct}
                className="w-full bg-black hover:bg-gray-800 text-white rounded-none mt-2 h-10 font-semibold uppercase text-xs"
              >
                Assign Product to Vendor
              </Button>
            </div>

            {/* ASSIGNED PRODUCTS TABLE */}
            <div className="lg:col-span-8 space-y-2">
               <div className="flex justify-between items-end mb-2">
                 <h3 className="text-xs font-mono  tracking-wider text-gray-400 ">Assigned Products</h3>
                 <span className="text-xs font-mono">TOTAL RECORDS: {assignedProducts.length}</span>
               </div>
               
               <div className="border border-black overflow-x-auto shadow-sm">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-black font-bold h-10 border-r border-gray-200 text-xs">S.No</TableHead>
                        <TableHead className="text-black font-bold h-10 border-r border-gray-200 text-xs">Item Code</TableHead>
                        <TableHead className="text-black font-bold h-10 border-r border-gray-200 text-xs">Description</TableHead>
                        <TableHead className="text-black font-bold text-center h-10 text-xs">Option</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignedProducts.length > 0 ? assignedProducts.map((item, idx) => (
                        <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="py-2 text-xs border-r border-gray-100">{idx + 1}</TableCell>
                          <TableCell className="py-2 text-xs border-r border-gray-100 font-bold">{item.itemCode}</TableCell>
                          <TableCell className="py-2 text-xs border-r border-gray-100 uppercase">{item.description}</TableCell>
                          <TableCell className="py-2 text-center">
                            <button 
                              onClick={() => handleRemoveProduct(item.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-1"
                              title="Remove Product"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center text-gray-400 italic text-xs">No products assigned to this vendor.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
               </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorManagementPage;