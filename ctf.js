// CTF Game Logic
document.addEventListener('DOMContentLoaded', function() {
    const gameOutput = document.getElementById('game-output');
    const gameInput = document.getElementById('game-input');
    const lieStatement = 2; // The second statement is the lie
    
    // Focus on input field
    gameInput.focus();
    
    // Add initial command effect
    setTimeout(() => {
        const typingEffect = setInterval(() => {
            if (gameOutput.scrollHeight > gameOutput.clientHeight) {
                gameOutput.scrollTop = gameOutput.scrollHeight;
            }
        }, 100);
    }, 500);
    
    // Handle user input
    gameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const ctfFlag = "CTF{Tr1v1a_M4st3r}"
            const command = this.value.trim();
            this.value = '';
            
            // Add user command to output
            const userCommand = document.createElement('div');
            userCommand.innerHTML = `<span class="game-prompt">ctf-player@game:~$</span> ${command}`;
            gameOutput.appendChild(userCommand);
            
            // Process command
            if (command.startsWith('check ')) {
                const guess = parseInt(command.split(' ')[1]);
                
                if (isNaN(guess) || guess < 1 || guess > 3) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-msg';
                    errorMsg.textContent = 'Error: Please enter a valid statement number (1, 2, or 3)';
                    gameOutput.appendChild(errorMsg);
                } else if (guess === lieStatement) {
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-msg';
                    successMsg.textContent = `Congratulations! You correctly identified the false statement. Flag: ${ctfFlag}`;
                    gameOutput.appendChild(successMsg);
                    
                    // Add celebration effect
                    document.getElementById('ctf-game').style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.5)';
                } else {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-msg';
                    errorMsg.textContent = `Incorrect! Statement ${lieStatement} is actually true. Try again.`;
                    gameOutput.appendChild(errorMsg);
                }
            } else if (command === 'help') {
                const helpMsg = document.createElement('div');
                helpMsg.innerHTML = `
                    <div>Available commands:</div>
                    <div>• check [number] - Validate if statement [number] is the lie</div>
                    <div>• help - Show this help message</div>
                    <div>• clear - Clear the terminal</div>
                `;
                gameOutput.appendChild(helpMsg);
            } else if (command === 'clear') {
                gameOutput.innerHTML = '';
            }else if(command == ctfFlag){
                const specialMsg = document.createElement('div');
                specialMsg.className = 'success-msg';
                specialMsg.textContent = 'Accessing security tools...';
                gameOutput.appendChild(specialMsg);
                
                // Trigger the password cracker Easter egg
                setTimeout(() => {
                    activatePasswordCracker();
                }, 1000);
            } else {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-msg';
                errorMsg.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
                gameOutput.appendChild(errorMsg);
            }
            
            // Scroll to bottom
            gameOutput.scrollTop = gameOutput.scrollHeight;
        }
    });



    
    


    const crackerInput = document.getElementById('cracker-input');
    const crackerOutput = document.getElementById('cracker-output');
    let crackerActive = false;
    
    // Function to add output line
    function addCrackerOutput(text, className = '') {
        const line = document.createElement('div');
        line.className = `hash-line ${className}`;
        line.innerHTML = text;
        crackerOutput.appendChild(line);
        crackerOutput.scrollTop = crackerOutput.scrollHeight;
    }
    
    // Function to simulate password cracking
    function runPasswordCracker() {
        if (crackerActive) return;
        crackerActive = true;
        
        // Clear input
        crackerInput.value = '';
        crackerInput.disabled = true;
        
        // Simulate password cracking process
        addCrackerOutput('> Testing 4-character passwords<span class="loading-dots"></span>', 'loading');
        
        setTimeout(() => {
            addCrackerOutput('> 4-character passwords exhausted (0 matches)');
            addCrackerOutput('> Testing 5-character passwords<span class="loading-dots"></span>', 'loading');
            
            setTimeout(() => {
                addCrackerOutput('> 5-character passwords exhausted (0 matches)');
                addCrackerOutput('> Testing 6-character passwords<span class="loading-dots"></span>', 'loading');
                
                setTimeout(() => {
                    addCrackerOutput('> Potential match found: "s3cur3"');
                    addCrackerOutput('> Verifying<span class="loading-dots"></span>', 'loading');
                    
                    setTimeout(() => {
                        addCrackerOutput('> <span class="fail-text">Match failed - continuing search</span>');
                        addCrackerOutput('> Testing 7-character passwords<span class="loading-dots"></span>', 'loading');
                        
                        setTimeout(() => {
                            addCrackerOutput('> Match found: "password"');
                            addCrackerOutput('> Verifying<span class="loading-dots"></span>', 'loading');
                            
                            setTimeout(() => {
                                addCrackerOutput('> <span class="success-text">PASSWORD CRACKED SUCCESSFULLY!</span>');
                                addCrackerOutput('> Hash: 5f4dcc3b5aa765d61d8327deb882cf99');
                                addCrackerOutput('> Password: <span class="cracked-password">password</span>');
                                addCrackerOutput('> Time elapsed: 3 minutes, 42 seconds');
                                addCrackerOutput('> Attempts: 12,458,321');
                                
                                // Re-enable input
                                setTimeout(() => {
                                    crackerInput.disabled = false;
                                    crackerInput.focus();
                                    crackerActive = false;
                                }, 1000);
                            }, 1500);
                        }, 2000);
                    }, 1500);
                }, 2000);
            }, 2000);
        }, 2000);
    }
    // Function to close the password cracker
    
    // Handle cracker input
    crackerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            
            if (command === 'run') {
                runPasswordCracker();
            } else if (command === 'clear') {
                crackerOutput.innerHTML = '';
                addCrackerOutput('> Password cracking simulation ready');
                addCrackerOutput('> Type "run" to start simulation');
            } else if (command === 'exit') {
                closeCracker();
            } else if (command) {
                addCrackerOutput(`> Unknown command: ${command}`);
                addCrackerOutput('> Available commands: run, clear, exit');
            }
            
            this.value = '';
        }
    });
    
    
    // Function to activate the password cracker Easter egg
    function activatePasswordCracker() {
        const cracker = document.getElementById('cracker-container');
        cracker.classList.add('active');
        
        // Focus on input field
        setTimeout(() => {
            document.getElementById('cracker-input').focus();
        }, 100);
    }


});