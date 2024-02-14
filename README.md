# tools-whois
A nodeJS app that does whois on aws cloudWatch exported json file.

Input should be in this format - which is how cloudWatch exports ip filters we are doing.
```
[
    {
        "remoteAddress": "34.237.40.31",
        "count": "415"
    }
]
```

# How to run
Get `logs-insights-results.json` from aws cloudWatch 'Logs Insights'' filter query.   
'Export Results' drop down - Select 'Download Table(JSON)'

Clone repo and drop your `logs-insights-results.json` in the project folder replacing whats in the project; then do
```
node whois 
```
OR

>Run vscode debugger.

Give it sometime to finish.

When its done there will be new fields in the output file with whois data

```
[
  {
    "remoteAddress": "34.237.40.31",
    "count": "415",
    "ipDetail": {
      "NetRange": "34.192.0.0 - 34.255.255.255",
      "CIDR": "34.192.0.0/10",
      "Organization": "Amazon Technologies Inc. (AT-88-Z)",
      "OrgName": "Amazon Technologies Inc."
    }
  }
]
```
✌️✌️✌️
