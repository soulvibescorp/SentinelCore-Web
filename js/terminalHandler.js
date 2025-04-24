const term = new Terminal();
term.open(document.getElementById('terminal'));

term.writeln('SentinelCore Terminal Dashboard v1.0');
term.writeln('Type "help" to see available commands.');

term.prompt = () => {
  term.write('\r\n> ');
};
term.prompt();

let commandBuffer = '';
term.onData(e => {
  switch (e) {
    case '\r': // Enter
      runCommand(commandBuffer.trim());
      commandBuffer = '';
      term.prompt();
      break;
    case '\u007F': // Backspace
      if (commandBuffer.length > 0) {
        term.write('\b \b');
        commandBuffer = commandBuffer.slice(0, -1);
      }
      break;
    default:
      term.write(e);
      commandBuffer += e;
  }
});

function runCommand(cmd) {
  switch (cmd.toLowerCase()) {
    case 'help':
      term.writeln('Available commands: help, status, logs, clear');
      break;
    case 'status':
      term.writeln('Firewall: Active | Encryption: AES-256 Enabled');
      break;
    case 'logs':
      term.writeln('Last Action: Encrypted folder /user/docs @ 12:02 PM');
      break;
    case 'clear':
      term.clear();
      break;
    default:
      term.writeln(`Unknown command: ${cmd}`);
  }
}
