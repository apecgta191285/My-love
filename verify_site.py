import os
from playwright.sync_api import sync_playwright

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to index.html
        cwd = os.getcwd()
        file_path = f"file://{cwd}/index.html"

        print(f"Navigating to {file_path}")
        page.goto(file_path)

        # Wait for content to load
        page.wait_for_load_state("networkidle")

        # Scroll to Palo section to trigger reveal
        palo_section = page.locator("#paloSection")
        if palo_section.count() > 0:
            palo_section.scroll_into_view_if_needed()
            page.wait_for_timeout(1000) # Wait for animation

        # Click theme toggle
        page.locator("#theme-toggle").click()
        page.wait_for_timeout(500)

        # Take screenshot
        screenshot_path = "verification_screenshot.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_site()
