
"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ContentLayout } from "@/components/layouts/content-layout"
import { FileSpreadsheet } from 'lucide-react';
import { DialogUploadIzvrsenjeBuzeta } from "@/features/izvrsenje-budzeta/components";
import { ExportExcel } from "@/shared/components/export-excel";
import { useState } from "react";
import type { GroupAndMergeResult } from "@/features/izvrsenje-budzeta/dto";

export default function IzvrsenjeBudzetaPage() {
    const [izvrsenjeBudzeta, setIzvrsenjeBudzeta] = useState<GroupAndMergeResult | null>(null);

    const handleDataProcessed = (data:GroupAndMergeResult) => {
        setIzvrsenjeBudzeta(data);
      
    }
    return (
        <ContentLayout routeTitle="Plan i izvrsenje">
            <div className="flex flex-row justify-around ju gap-4">
                <div className="flex flex-rpw gap-x-3">
                    <DialogUploadIzvrsenjeBuzeta
                        triggerButton={
                            <Button variant="outline" className="p-1 bg-transparent">
                                Insert excel document
                            </Button>
                        }
                        onDataProcessed={handleDataProcessed}
                    />
                    {izvrsenjeBudzeta && izvrsenjeBudzeta.planIIzvrsenje.length > 0 && (
                        <ExportExcel 
                            data={izvrsenjeBudzeta.planIIzvrsenje} 
                            header={izvrsenjeBudzeta.header} 
                            fileName={'Plan i Izvrsenje izvestaj.xlsx'} 
                        />
                    )}
                </div>
            </div>
        </ContentLayout>
    )
}
