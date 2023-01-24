<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="ul">
  <html>
    <body>
      <xsl:for-each select="li">
        <h3><xsl:value-of select="."/></h3>
        <xsl:for-each select="ul/li">
          <label class="form-control">
            <input type="radio" name="question{position()}" value="answer{position()}"/>
            <xsl:value-of select="."/>
          </label>
          <br/>
        </xsl:for-each>
      </xsl:for-each>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
