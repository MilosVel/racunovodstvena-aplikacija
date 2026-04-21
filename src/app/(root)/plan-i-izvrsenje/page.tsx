
"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ContentLayout } from "@/components/layouts/content-layout"
import { FileSpreadsheet } from 'lucide-react';
import { UploadDialogForPlanIIzvrsenje } from "@/features/plan-i-izvrsenje/components";
import { ExportExcel } from "@/shared/components/export-excel";
import { useState } from "react";
import type { GroupAndMergeResult } from "@/features/plan-i-izvrsenje/dto";

export default function PlanIIzvrsenjePage() {
    const [planIIzvrsenje, setPlanIIzvrsenje] = useState<GroupAndMergeResult | null>(null);

    const handleDataProcessed = (data:GroupAndMergeResult) => {
        setPlanIIzvrsenje(data);
      
    }
    return (
        <ContentLayout routeTitle="Plan i izvrsenje">
            <div className="flex flex-row justify-around ju gap-4">
                <div className="flex flex-rpw gap-x-3">
                    <UploadDialogForPlanIIzvrsenje
                        triggerButton={
                            <Button variant="outline" className="p-1 bg-transparent">
                                Insert excel document
                            </Button>
                        }
                        onDataProcessed={handleDataProcessed}
                    />
                    {planIIzvrsenje && planIIzvrsenje.planIIzvrsenje.length > 0 && (
                        <ExportExcel 
                            data={planIIzvrsenje.planIIzvrsenje} 
                            header={planIIzvrsenje.header} 
                            fileName={'Plan i Izvrsenje izvestaj.xlsx'} 
                        />
                    )}
                </div>
            </div>
        </ContentLayout>
    )
}
