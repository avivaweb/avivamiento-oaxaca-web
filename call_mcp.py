import json
import subprocess
import sys

def call_mcp_tool(command, tool_name, arguments={}):
    process = subprocess.Popen(
        command,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    # MCP Initialize
    init_request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "test-client", "version": "1.0"}
        }
    }
    
    process.stdin.write(json.dumps(init_request) + "\n")
    process.stdin.flush()
    
    # Read response (discarding logs)
    while True:
        line = process.stdout.readline()
        if not line: break
        resp = json.loads(line)
        if "id" in resp and resp["id"] == 1:
            break

    # Call tool or list tools
    if tool_name == "list":
        req = {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/list",
            "params": {}
        }
    else:
        req = {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/call",
            "params": {
                "name": tool_name,
                "arguments": arguments
            }
        }
    
    process.stdin.write(json.dumps(req) + "\n")
    process.stdin.flush()
    
    while True:
        line = process.stdout.readline()
        if not line: break
        resp = json.loads(line)
        if "id" in resp and resp["id"] == 2:
            print(json.dumps(resp, indent=2))
            break

    process.terminate()

if __name__ == "__main__":
    server_cmd = ["/Users/dvmedios/.local/bin/uvx", "--from", "notebooklm-mcp-server", "notebooklm-mcp"]
    call_mcp_tool(server_cmd, sys.argv[1], json.loads(sys.argv[2]) if len(sys.argv) > 2 else {})
