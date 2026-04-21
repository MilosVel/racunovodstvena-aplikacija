"use client";

import { CommonDialog } from '@/components/ui/dialog/common-dialog';
import { useDisclosure } from '@/hooks';
import { UploadPlanIIzvrsenjeDataForm } from '@/features/plan-i-izvrsenje/components/upload-plan-i-izvrsenje-form';

import type { GroupAndMergeResult } from "@/features/plan-i-izvrsenje/dto";

type UploadDialogForPlanIIzvrsenjeProps = {
    triggerButton: React.ReactElement;
    onDataProcessed?: (data:GroupAndMergeResult) => void;
};
export function UploadDialogForPlanIIzvrsenje({
    triggerButton,
    onDataProcessed,
}: UploadDialogForPlanIIzvrsenjeProps) {

    const createPlanActions = useDisclosure();

    return (
        <>
            <CommonDialog
                title={`Plan i izvrsenje`}
                triggerButton={triggerButton}
                isOpen={createPlanActions.isOpen}
                onOpenChange={createPlanActions.toggle}
                className="max-w-xl"
                content={
                    <div className="mb-8">
                        <UploadPlanIIzvrsenjeDataForm 
                            closeCreteTable={createPlanActions.toggle} 
                            onDataProcessed={onDataProcessed}
                        />
                    </div>
                }
            />
        </>
    );
}
