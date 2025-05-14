import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelperTooltip } from "../../../components/HelperTooltip";

export const DashboardAccordion = ({
  children,
  content,
  mainLabel,
}: Readonly<{
  content: React.ReactNode;
  children: React.ReactNode;
  mainLabel: string;
}>) => (
  <Accordion type="single" collapsible className="w-full mb-[14px]">
    <AccordionItem value="item-1">
      <AccordionTrigger className="w-full font-normal text-[14px] text-center dashboard-general-style-controller text-deep-blue-gray [&[data-state=open]]:bg-[#fafafa] !mb-0">
        <span className="flex justify-center items-center gap-2 ">
          <HelperTooltip content={content} />
          {mainLabel}
        </span>
      </AccordionTrigger>
      <AccordionContent className="dashboard-general-style-controller flex flex-col !h-auto p-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
