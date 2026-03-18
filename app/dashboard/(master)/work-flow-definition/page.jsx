'use client';
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Ensure you have the shadcn Textarea component
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil, XCircle, PlusCircle, RotateCcw } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const WorkFlowPage = () => {
  // State for form inputs based on reference image
  const [formData, setFormData] = useState({
    product: '',
    description: '',
    stage: '',
    productDescStage: '',
    workFlow: ''
  });

  const [dataList, setDataList] = useState([]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      product: '',
      description: '',
      stage: '',
      productDescStage: '',
      workFlow: ''
    });
    toast.success("Form Reset");
  };

  const handleSave = () => {
    if (!formData.product || !formData.description) {
      toast.error("Please fill in required fields");
      return;
    }
    
    setDataList([{ id: Date.now(), ...formData }, ...dataList]);
    handleReset();
    toast.success("Work Flow Saved");
  };

  return (
    <div className="p-3 md:p-6 w-full space-y-10 bg-background">
      <Toaster position="top-right" />
      
      {/* Header matching the DefinitionPage style */}
      <div className="space-y-1">

          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Work Flow Definitions</h2>
        <hr className="border-border" />
      </div>

      {/* Grid Layout for Form Fields */}
      <div className="space-y-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Product Input */}
          <div className="space-y-2">
            <Label className="text-sm">Product</Label>
            <Input 
              className="rounded-none border-gray-200"
              value={formData.product}
              onChange={(e) => handleChange('product', e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label className="text-sm">Description</Label>
            <Input 
              placeholder="Select the Product Desc"
              className="rounded-none border-gray-200"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          {/* Stage Input */}
          <div className="space-y-2">
            <Label className="text-sm">Stage</Label>
            <Input 
              className="rounded-none border-gray-200"
              value={formData.stage}
              onChange={(e) => handleChange('stage', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 items-start">
          {/* Product Desc Stage Select */}
          <div className="space-y-2">
            <Label className="text-sm">Product Desc Stage</Label>
            <Select 
              value={formData.productDescStage} 
              onValueChange={(v) => handleChange('productDescStage', v)}
            >
              <SelectTrigger className="rounded-none border-gray-200">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stage1">Stage 1</SelectItem>
                <SelectItem value="stage2">Stage 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Work Flow Textarea */}
          <div className="space-y-2">
            <Label className="text-sm">Work Flow</Label>
            <Textarea 
              className="rounded-none border-gray-200 min-h-[100px]"
              value={formData.workFlow}
              onChange={(e) => handleChange('workFlow', e.target.value)}
            />
          </div>
        </div>

        {/* Centered Action Buttons */}
        <div className="flex justify-start gap-4">
          <Button 
            className="rounded-none px-10 font-bold bg-main text-white hover:bg-mainhvr"
            onClick={handleSave}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button 
            variant="outline"
            className="rounded-none px-10 font-bold border-border text-foreground hover:bg-muted"
            onClick={handleReset}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      </div>

      {/* Simplified Data List Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">Work Flow List</h3>
          <span className="text-xs font-mono text-muted-foreground">{dataList.length} Records</span>
        </div>

        <div className="border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted text-foreground">
              <TableRow>
                <TableHead className="w-[60px] text-center font-bold uppercase text-[10px]">No.</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Product</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Stage</TableHead>
                <TableHead className="text-right font-bold uppercase text-[10px] px-6">Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataList.length > 0 ? (
                dataList.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-muted border-b border-border last:border-0">
                    <TableCell className="text-center text-sm text-muted-foreground">{index + 1}</TableCell>
                    <TableCell className="text-sm font-medium">{item.product}</TableCell>
                    <TableCell className="text-sm">{item.stage}</TableCell>
                    <TableCell className="flex justify-end gap-4 py-3 px-6 text-gray-400">
                      <button className="hover:text-black"><Pencil size={16} /></button>
                      <button className="hover:text-red-500"><XCircle size={16} /></button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-400 italic">No records added yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WorkFlowPage;