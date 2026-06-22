import sys
import re

with open('c:/Users/sys/Music/opportunity-hub/converted/auth.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Main Auth Section Wrapper Replacement
# We want to replace the outer grid and columns.
new_main_start = '''  <!-- Main Auth Section -->
  <main class="mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative">
    <div class="w-full max-w-xl animate-fade-in-up">
      
      <!-- Top Level Tabs (Login / Register) -->
      <div class="mb-6 flex rounded-xl bg-gray-200/60 p-1 shadow-sm">
        <button id="tab-login" onclick="setAuthView('login')" class="flex-1 rounded-lg bg-white py-2.5 text-sm font-bold text-gray-900 shadow-sm transition-all ring-1 ring-gray-900/5">
          Login
        </button>
        <button id="tab-register" onclick="setAuthView('register')" class="flex-1 rounded-lg py-2.5 text-sm font-semibold text-gray-500 transition-all hover:text-gray-900">
          Register
        </button>
      </div>

      <div class="relative w-full shadow-xl ring-1 ring-gray-200/60 rounded-2xl overflow-hidden bg-white">
'''

# Extract LOGIN block
# It starts at <div class="mb-6"> under LOGIN FORM, up to the end of <form id="login-form">
login_start_idx = content.find('<div class="mb-6">', content.find('<!-- LEFT COLUMN: LOGIN FORM -->'))
login_end_idx = content.find('</form>', login_start_idx) + 7
login_block = content[login_start_idx:login_end_idx]

# Wrap login block
new_login_block = f'''
        <!-- LOGIN VIEW -->
        <div id="login-view-container" class="p-6 sm:p-8">
          {login_block}
        </div>
'''

# Extract STUDENT block
student_start_idx = content.find('<!-- Alerts -->', content.find('<!-- VIEW 2: STUDENT REGISTRATION FORM -->'))
student_end_idx = content.find('</form>', student_start_idx) + 7
student_block = content[student_start_idx:student_end_idx]

# Extract INSTRUCTOR block
instructor_start_idx = content.find('<!-- Alerts -->', content.find('<!-- VIEW 3: INSTRUCTOR REGISTRATION FORM -->'))
instructor_end_idx = content.find('</form>', instructor_start_idx) + 7
instructor_block = content[instructor_start_idx:instructor_end_idx]

# Wrap REGISTER block
new_register_block = f'''
        <!-- REGISTER VIEW -->
        <div id="register-view-container" class="hidden p-6 sm:p-8 bg-[#142033]">
          <div class="mb-6 text-center">
            <h2 class="text-2xl font-extrabold text-white">Join UstadHub</h2>
            <p class="mt-1 text-sm text-[#d0d4dc]">Learn & Teach Worldwide</p>
          </div>

          <!-- Role Selection Sub-Tabs -->
          <div class="mb-6 flex rounded-xl bg-white/5 p-1 border border-white/10">
             <button id="subtab-student" onclick="setRegistrationRole('student')" class="flex-1 rounded-lg bg-[#f5c21a] py-2 text-sm font-bold text-[#0c1422] transition-all flex items-center justify-center gap-2 shadow-sm">
               <i data-lucide="book-open" class="h-4 w-4"></i> Student
             </button>
             <button id="subtab-instructor" onclick="setRegistrationRole('instructor')" class="flex-1 rounded-lg py-2 text-sm font-medium text-[#d0d4dc] transition-all hover:text-white flex items-center justify-center gap-2">
               <i data-lucide="briefcase" class="h-4 w-4"></i> Instructor
             </button>
          </div>

          <!-- Student Registration Form -->
          <div id="student-reg-form-container" class="">
            {student_block}
          </div>

          <!-- Instructor Registration Form -->
          <div id="instructor-reg-form-container" class="hidden">
            {instructor_block}
          </div>
        </div>
      </div>
    </div>
  </main>
'''

header_end = content.find('<!-- Main Auth Section -->')
footer_start = content.find('<!-- Lucide Icons Library CDN -->')

header = content[:header_end]
footer = content[footer_start:]

new_content = header + new_main_start + new_login_block + new_register_block + footer

with open('c:/Users/sys/Music/opportunity-hub/converted/auth.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Successfully rewrote auth.html')
