'use client';
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil, XCircle, PlusCircle, RotateCcw } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const TaxMasterPage = () => {
  // State for form inputs based on the tax details image
  const [formData, setFormData] = useState({
    taxNameCode: '',
    taxDescription: '',
    percent: ''
  });

  // Initial data from the image
  const [dataList, setDataList] = useState([
    { id: 1, taxNameCode: 'CGST', taxDescription: 'CGST', percent: '6%' },
    { id: 2, taxNameCode: 'SGST', taxDescription: 'SGST', percent: '6%' },
    { id: 3, taxNameCode: 'IGST', taxDescription: 'IGST', percent: '12%' }
  ]);

  const [editingId, setEditingId] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      taxNameCode: '',
      taxDescription: '',
      percent: ''
    });
    setEditingId(null);
    toast.success("Form Reset");
  };

  const handleSave = () => {
    if (!formData.taxNameCode || !formData.percent) {
      toast.error("Please fill in required fields (Tax Name/Code and Percent)");
      return;
    }

    // Format percent with % symbol if not already present
    const formattedPercent = formData.percent.includes('%') ? formData.percent : `${formData.percent}%`;

    if (editingId) {
      // Update existing record
      setDataList(dataList.map(item => 
        item.id === editingId 
          ? { 
              ...item, 
              taxNameCode: formData.taxNameCode,
              taxDescription: formData.taxDescription,
              percent: formattedPercent 
            }
          : item
      ));
      toast.success("Tax Details Updated");
    } else {
      // Add new record
      const newItem = {
        id: Date.now(),
        taxNameCode: formData.taxNameCode,
        taxDescription: formData.taxDescription,
        percent: formattedPercent
      };
      setDataList([...dataList, newItem]);
      toast.success("Tax Details Saved");
    }
    
    handleReset();
  };

  const handleEdit = (item) => {
    setFormData({
      taxNameCode: item.taxNameCode,
      taxDescription: item.taxDescription,
      percent: item.percent.replace('%', '')
    });
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setDataList(dataList.filter(item => item.id !== id));
    if (editingId === id) {
      handleReset();
    }
    toast.success("Tax Details Deleted");
  };

  return (
    <div className="p-3 md:p-6 w-full space-y-10 bg-background">
      <Toaster position="top-right" />
      
      {/* Header with Tax Details title */}
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Tax Details</h2>
        <hr className="border-border" />
      </div>

      {/* Form Fields Grid */}
      <div className="space-y-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tax Name/Code Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Tax Name/Code <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="Enter tax name or code"
              className="rounded-none border-gray-200"
              value={formData.taxNameCode}
              onChange={(e) => handleChange('taxNameCode', e.target.value)}
            />
          </div>

          {/* Tax Description Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tax Description</Label>
            <Input 
              placeholder="Enter tax description"
              className="rounded-none border-gray-200"
              value={formData.taxDescription}
              onChange={(e) => handleChange('taxDescription', e.target.value)}
            />
          </div>

          {/* Percent Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Percent <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="Enter percentage"
              className="rounded-none border-gray-200"
              value={formData.percent}
              onChange={(e) => handleChange('percent', e.target.value)}
              type="number"
              step="0.01"
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Centered Action Buttons */}
        <div className="flex justify-start gap-4">
          <Button 
            className="rounded-none px-10 font-bold bg-main text-white hover:bg-mainhvr cursor-pointer"
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

      {/* Tax Details Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">Tax List</h3>
          <span className="text-xs font-mono text-muted-foreground">Records Count : {dataList.length}</span>
        </div>

        <div className="border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-[60px] text-center font-bold uppercase text-[11px] text-black">S.No.</TableHead>
                <TableHead className="font-bold uppercase text-[11px] text-black">Tax Name/Code</TableHead>
                <TableHead className="font-bold uppercase text-[11px] text-black">Tax Description</TableHead>
                <TableHead className="font-bold uppercase text-[11px] text-black">Percent</TableHead>
                <TableHead className="text-center font-bold uppercase text-[11px] text-black">Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataList.length > 0 ? (
                dataList.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-muted border-b border-border">
                    <TableCell className="text-center text-sm text-muted-foreground">{index + 1}</TableCell>
                    <TableCell className="text-sm font-medium">{item.taxNameCode}</TableCell>
                    <TableCell className="text-sm text-gray-700">{item.taxDescription}</TableCell>
                    <TableCell className="text-sm text-gray-700">{item.percent}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-3 text-gray-400">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-gray-400 italic">
                    No tax records added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TaxMasterPage;