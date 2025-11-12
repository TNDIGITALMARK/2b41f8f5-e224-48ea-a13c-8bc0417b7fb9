'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const { cartCount, cart, cartTotal, removeFromCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="text-primary">STEP</span>
              <span className="text-accent">MAX</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/products?category=running"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Running
            </Link>
            <Link
              href="/products?category=basketball"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Basketball
            </Link>
            <Link
              href="/products?category=lifestyle"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Lifestyle
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <ShoppingCart className="h-16 w-16 text-muted-foreground/40 mb-4" />
                      <p className="text-muted-foreground">Your cart is empty</p>
                      <Button asChild className="mt-4">
                        <Link href="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {cart.map((item, index) => (
                          <div
                            key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                            className="flex gap-4 border-b pb-4"
                          >
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.product.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Size: {item.size} • Color: {item.color}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-sm font-medium">
                                  ${item.product.price} × {item.quantity}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-lg font-semibold">Total</p>
                          <p className="text-2xl font-bold">${cartTotal.toFixed(2)}</p>
                        </div>
                        <Button className="w-full" size="lg">
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link href="/" className="text-lg font-medium">
                    Home
                  </Link>
                  <Link href="/products" className="text-lg font-medium">
                    Shop
                  </Link>
                  <Link href="/products?category=running" className="text-lg font-medium">
                    Running
                  </Link>
                  <Link href="/products?category=basketball" className="text-lg font-medium">
                    Basketball
                  </Link>
                  <Link href="/products?category=lifestyle" className="text-lg font-medium">
                    Lifestyle
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
