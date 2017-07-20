import org.springframework.web.servlet.i18n.SessionLocaleResolver
import com.dewcom.light.filters.*

// Place your Spring DSL code here

beans = {
    localeResolver(org.springframework.web.servlet.i18n.SessionLocaleResolver) {
        defaultLocale = new Locale("es","ES")
        java.util.Locale.setDefault(defaultLocale)
    }

    corsFilter(CorsFilter)

}
