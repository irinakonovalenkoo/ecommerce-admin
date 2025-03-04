import { Metadata } from "next";
import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

interface BillboardPageProps {
    params: {
        billboardId: string;
    };
}

// ✅ Funcția generateMetadata pentru SEO
export async function generateMetadata({ params }: BillboardPageProps): Promise<Metadata> {
    const billboard = await prismadb.billboard.findUnique({
        where: { id: params.billboardId }
    });

    return {
        title: billboard?.label || "Edit Billboard",
    };
}

// ✅ Funcția principală a paginii
const BillboardPage = async ({ params }: BillboardPageProps) => {
    const billboard = await prismadb.billboard.findUnique({
        where: { id: params.billboardId }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
};

export default BillboardPage;
