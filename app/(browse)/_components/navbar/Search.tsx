"use client";

import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import qs from "query-string";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = ()=>{
    return (
        <form className="relative w-full lg:w-[400px] flex items-center">
            <Input placeholder="Search" />
        </form>
    );
}