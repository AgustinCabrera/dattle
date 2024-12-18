"use client";

import {
  RiBankCard2Line,
  RiCustomerService2Fill,
  RiExchange2Line,
  RiHome2Line,
} from "@remixicon/react"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"

export const TabNavigationComponent = () => (
  <TabNavigation>
    <TabNavigationLink href="#" active className="inline-flex gap-2">
      <RiHome2Line className="size-4" aria-hidden="true" />
      Home
    </TabNavigationLink>
    <TabNavigationLink href="#" className="inline-flex gap-2">
      <RiBankCard2Line className="-ml-1 size-4" aria-hidden="true" />
      Parto
    </TabNavigationLink>
    <TabNavigationLink href="#" className="inline-flex gap-2">
      <RiExchange2Line className="-ml-1 size-4" aria-hidden="true" />
      Enfermedades
    </TabNavigationLink>
    <TabNavigationLink href="#" className="inline-flex gap-2">
      <RiCustomerService2Fill className="-ml-1 size-4" aria-hidden="true" />
      Login
    </TabNavigationLink>
  </TabNavigation>
)