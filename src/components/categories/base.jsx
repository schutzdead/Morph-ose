import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

import Left from '../../../public/assets/articles/leftSide.svg'
import Right from '../../../public/assets/articles/rightSide.svg'
import { Loading } from "@/utils/loader";

export function Tab ({category}) {
    return(
    <>
        {!category 
            ? <Loading />
            :category?.childs?.map(e => 
                <ul className="flex flex-col pb-10 gap-5 tracking-wide" key={e.id}>
                    <li className="cursor-pointer" >
                        <Link href="/[sections]/[categories]" as={`/${category?.slug}/${e?.slug}`}>{e?.title}</Link>
                    </li>
                    <ul className="flex flex-col gap-4 pl-5 cursor-pointer">
                        {e?.childs.map(sc => 
                            <li key={sc.id}>
                                <Link href="/[sections]/[categories]/[subCategories]" as={`/${category?.slug}/${e?.slug}/${sc.slug}`}>{sc?.title}</Link>
                            </li>
                        )}
                    </ul>
                </ul>
            )}
    </>
    )
}

