'use client';
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pencil, XCircle, PlusCircle, CheckCircle, RefreshCcw } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

// Logical mapping for auto-filling Unit Type based on Measure
const MEASURE_TO_TYPE_MAP = {
  kg: 'Raw', gm: 'Raw', mg: 'Raw',
  mtr: 'Raw', cm: 'Raw', mm: 'Raw',
  pcs: 'Consumable', unit: 'Consumable', box: 'Consumable', pkt: 'Consumable'
};

const WorkProductsPage = () => {
  const [activeTab, setActiveTab] = useState("work-product");
  
  const [workProducts, setWorkProducts] = useState([
    { id: 1, code: "1", hsn: "", desc: "ADORO/PFM", price: "225", status: "Active" }
  ]);
  const [materials, setMaterials] = useState([
    { id: 1, code: "M-001", desc: "Plaster of Paris", price: "45", measure: "kg", type: "Raw", reorder: "5", status: "Active" }
  ]);

  const [formData, setFormData] = useState({
    productCode: '',
    unitPrice: '',
    productDescription: '',
    pricing: 'per/unit',
    status: 'Active',
    hsnCode: '',
    productType: '',
    unitMeasure: '',
    unitType: '',
    reorderQty: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-update Unit Type when Unit Measure is selected
      if (field === 'unitMeasure' && MEASURE_TO_TYPE_MAP[value]) {
        updated.unitType = MEASURE_TO_TYPE_MAP[value];
      }
      return updated;
    });
  };

  const handleReset = () => {
    setFormData({
      productCode: '', unitPrice: '', productDescription: '', pricing: 'per/unit',
      status: 'Active', hsnCode: '', productType: '',
      unitMeasure: '', unitType: '', reorderQty: ''
    });
  };

  const handleSave = () => {
    if (!formData.productCode || !formData.productDescription || !formData.unitPrice) {
      toast.error("Please fill in mandatory fields (*)");
      return;
    }

    if (activeTab === "work-product") {
      setWorkProducts([...workProducts, {
        id: Date.now(),
        code: formData.productCode,
        desc: formData.productDescription,
        price: formData.unitPrice,
        hsn: formData.hsnCode,
        status: formData.status
      }]);
    } else {
      setMaterials([...materials, {
        id: Date.now(),
        code: formData.productCode,
        desc: formData.productDescription,
        price: formData.unitPrice,
        measure: formData.unitMeasure,
        type: formData.unitType,
        reorder: formData.reorderQty,
        status: formData.status
      }]);
    }
    toast.success("Saved successfully");
    handleReset();
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto space-y-6 bg-background min-h-screen font-sans">
      <Toaster position="top-right" />
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 border-b pb-2">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory Management</h1>
        <div className="text-xs text-red-500 font-mono">* indicates mandatory</div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-12">
        <TabsList className="bg-muted p-1 rounded-none mb-6">
          <TabsTrigger value="work-product" className="rounded-none px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Work Product</TabsTrigger>
          <TabsTrigger value="materials" className="rounded-none px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Materials</TabsTrigger>
        </TabsList>

        <div className="border p-6 space-y-6 shadow-sm mb-10">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            - {activeTab === 'work-product' ? 'Work Product Information' : 'Material Information'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-2">
                <Label>Product Code<span className="text-red-500">*</span></Label>
                <Input className="col-span-2 rounded-none border-gray-300" value={formData.productCode} onChange={(e) => handleChange('productCode', e.target.value)} />
              </div>

              <div className="grid grid-cols-3 items-center gap-2">
                <Label>Description<span className="text-red-500">*</span></Label>
                <Input className="col-span-2 rounded-none border-gray-300" value={formData.productDescription} onChange={(e) => handleChange('productDescription', e.target.value)} />
              </div>

              {activeTab === 'materials' && (
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label>Unit Measure/Type<span className="text-red-500">*</span></Label>
                  <div className="col-span-2 flex gap-2">
                    {/* Unit Measure */}
                    <Select value={formData.unitMeasure} onValueChange={(v) => handleChange('unitMeasure', v)}>
                      <SelectTrigger className="rounded-none border-gray-300 flex-1">
                        <SelectValue placeholder="Measure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Weight</SelectLabel>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="gm">gm</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>General</SelectLabel>
                          <SelectItem value="pcs">pcs</SelectItem>
                          <SelectItem value="box">box</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                    {/* Unit Type (Integrated here) */}
                    <Select value={formData.unitType} onValueChange={(v) => handleChange('unitType', v)}>
                      <SelectTrigger className="rounded-none border-gray-300 flex-1">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Raw">Raw Material</SelectItem>
                        <SelectItem value="Consumable">Consumable</SelectItem>
                        <SelectItem value="Tool">Tool</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {activeTab === 'work-product' && (
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label>HSN Code</Label>
                  <Input className="col-span-2 rounded-none border-gray-300" value={formData.hsnCode} onChange={(e) => handleChange('hsnCode', e.target.value)} />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-2">
                <Label>Unit Price (QAR)<span className="text-red-500">*</span></Label>
                <Input type="number" className="col-span-2 rounded-none border-gray-300" value={formData.unitPrice} onChange={(e) => handleChange('unitPrice', e.target.value)} />
              </div>

              {activeTab === 'materials' ? (
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label>Reorder Qty</Label>
                  <Input type="number" className="col-span-2 rounded-none border-gray-300" value={formData.reorderQty} onChange={(e) => handleChange('reorderQty', e.target.value)} />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <Label>Pricing</Label>
                    <Input className="col-span-2 rounded-none border-border bg-muted text-muted-foreground" value={formData.pricing} readOnly />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <Label>Product Type</Label>
                    <Select value={formData.productType} onValueChange={(v) => handleChange('productType', v)}>
                      <SelectTrigger className="col-span-2 rounded-none border-gray-300">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Materials">Materials</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="grid grid-cols-3 items-center gap-2">
                <Label>Status</Label>
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-sm font-medium">{formData.status}</span>
                  <div 
                    className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${formData.status === 'Active' ? 'bg-green-600' : 'bg-muted'}`}
                    onClick={() => handleChange('status', formData.status === 'Active' ? 'Inactive' : 'Active')}
                  >
                    <div className={`bg-background w-3 h-3 rounded-full shadow-sm transition-transform ${formData.status === 'Active' ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button className="rounded-none bg-primary hover:bg-primary/80 text-primary-foreground px-8" onClick={handleSave}>
              <PlusCircle className="w-4 h-4 mr-2" /> Save
            </Button>
            <Button variant="outline" className="rounded-none border-gray-300 px-8" onClick={handleReset}>
              <RefreshCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </div>

        <TabsContent value="work-product">
          <TableDisplay title="Work Product List" data={workProducts} columns={["S.No", "Product Code", "HSN Code", "Product Description", "Unit Price(QAR)", "Option"]} type="work" />
        </TabsContent>

        <TabsContent value="materials">
          <TableDisplay title="Materials List" data={materials} columns={["S.No", "Product Code", "Description", "Price", "Measure", "Unit Type", "Reorder Qty", "Option"]} type="material" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TableDisplay = ({ title, data, columns, type }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-mono text-gray-500 tracking-tighter">
      <span>{title}</span>
      <span>Fetched Record(s): {data.length}</span>
    </div>
    <div className="border border-gray-200 overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow className="hover:bg-transparent">
            {columns.map((col, i) => (
              <TableHead key={i} className="text-black font-bold text-xs h-10">{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? data.map((item, i) => (
            <TableRow key={item.id} className="hover:bg-muted/50">
              <TableCell className="py-2 text-sm">{i + 1}</TableCell>
              <TableCell className="py-2 text-sm">{item.code}</TableCell>
              {type === 'work' ? (
                <>
                  <TableCell className="py-2 text-sm">{item.hsn || '-'}</TableCell>
                  <TableCell className="py-2 text-sm">{item.desc}</TableCell>
                  <TableCell className="py-2 text-sm font-medium">{item.price}</TableCell>
                </>
              ) : (
                <>
                  <TableCell className="py-2 text-sm">{item.desc}</TableCell>
                  <TableCell className="py-2 text-sm font-medium">{item.price}</TableCell>
                  <TableCell className="py-2 text-sm uppercase">{item.measure}</TableCell>
                  <TableCell className="py-2 text-sm">{item.type}</TableCell>
                  <TableCell className="py-2 text-sm">{item.reorder}</TableCell>
                </>
              )}
              <TableCell className="py-2">
                <div className="flex gap-3">
                  <Pencil className="w-4 h-4 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors" />
                  <XCircle className="w-4 h-4 text-red-300 cursor-pointer hover:text-red-500 transition-colors" />
                  <CheckCircle className={`w-4 h-4 ${item.status === 'Active' ? 'text-green-500' : 'text-gray-300'}`} />
                </div>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-10 text-gray-400">No records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default WorkProductsPage;