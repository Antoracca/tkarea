# Commandes reseau (PowerShell Admin)

Copie/colle ce bloc dans PowerShell **en mode Administrateur**:

```powershell
Get-NetAdapter | Where-Object {
  $_.InterfaceDescription -match "VMware|VirtualBox|Hyper-V"
} | Disable-NetAdapter -Confirm:$false

Get-NetAdapter | Sort-Object Name | Format-Table Name,Status -Auto
ipconfig | findstr /i "Wi-Fi IPv4"
```

URL iPhone a tester ensuite:

```text
http://TON_IP_WIFI:3000
```
