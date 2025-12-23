"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PaymentMethod {
  id: string;
  name: string;
  qrImage: string;
  paymentLink: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "vodafone",
    name: "Vodafone Cash",
    qrImage:
      "https://storage.googleapis.com/rabet-prod/payment-qr-codes/WhatsApp%20Image%202025-12-23%20at%2010.42.46%20PM.jpeg",
    paymentLink: "http://vf.eg/vfcash?id=mt&qrId=4vbIZv",
  },
  {
    id: "instapay",
    name: "Instapay",
    qrImage:
      "https://storage.googleapis.com/rabet-prod/payment-qr-codes/WhatsApp%20Image%202025-12-23%20at%2011.06.13%20PM.jpeg",
    paymentLink: "https://ipn.eg/S/mohamed.gad2622/instapay/9J3kuA",
  },
];

export function PaymentMethodTabs() {
  const t = useTranslations("Subscription");

  return (
    <Tabs defaultValue={paymentMethods[0].id} className="w-full mb-5">
      <TabsList className="grid w-full grid-cols-2">
        {paymentMethods.map((method) => (
          <TabsTrigger key={method.id} value={method.id}>
            {method.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {paymentMethods.map((method) => (
        <TabsContent key={method.id} value={method.id} className="space-y-4">
          <div className="flex flex-col items-center gap-5 p-6 border rounded-lg bg-white">
            {/* QR Code Image */}
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={method.qrImage}
                alt={`${method.name} QR Code`}
                width={192}
                height={192}
                className="object-contain"
              />
            </div>

            {/* Payment Link */}
            <a
              href={method.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span className="text-lg text-blue-600 hover:underline font-semibold text-center">
                {t("paymentLink")}
              </span>
              <ExternalLink className="text-secondary-foreground w-5 h-5" />
            </a>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
