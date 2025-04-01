import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"

export default function AddressLookupPage() {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) return

    setLoading(true)

    try {
      const res = await fetch("http://localhost:3001/api/address-lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      })

      if (!res.ok) {
        throw new Error("Failed to queue address")
      }

      toast.success("Your address is being looked up. We'll notify you once it's complete.")

      setAddress("")
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">HCAD Address Lookup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="address">Enter Address</Label>
          <Input
            id="address"
            placeholder="e.g. 1234 Main St, Houston, TX"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading || !address}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  )
}