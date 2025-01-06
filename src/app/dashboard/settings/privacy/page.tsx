"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    dataSharing: false,
    activityTracking: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Privacy settings updated:', privacySettings)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Manage your privacy preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <Switch 
                id="profile-visibility" 
                checked={privacySettings.profileVisibility}
                onCheckedChange={(checked) => setPrivacySettings({...privacySettings, profileVisibility: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-sharing">Data Sharing</Label>
              <Switch 
                id="data-sharing" 
                checked={privacySettings.dataSharing}
                onCheckedChange={(checked) => setPrivacySettings({...privacySettings, dataSharing: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="activity-tracking">Activity Tracking</Label>
              <Switch 
                id="activity-tracking" 
                checked={privacySettings.activityTracking}
                onCheckedChange={(checked) => setPrivacySettings({...privacySettings, activityTracking: checked})}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

